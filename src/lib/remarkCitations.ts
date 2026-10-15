import type { FootnoteDefinition, PhrasingContent, Root, Text } from "mdast";
import { SKIP, visit } from "unist-util-visit";
import type { BibEntry } from "./bibtex";

export interface RemarkCitationsOptions {
  entries: Record<string, BibEntry>;
}

/** Pandoc-style citations: `[@key]` or `[@a; @b]`. */
const CITATION_GROUP = /\[(@[^\[\]]+)\]/g;
const CITATION_KEY = /^@([^\s,;@]+)$/;

const MAX_LISTED_AUTHORS = 5;

function citationId(key: string) {
  return `cite-${key}`;
}

function formatAuthors(raw: string | undefined): string {
  if (!raw) return "";
  const names = raw
    .split(/\s+and\s+/i)
    .map((name) => {
      const trimmed = name.trim();
      if (!trimmed.includes(",")) return trimmed;
      const [last, ...first] = trimmed.split(",");
      return `${first.join(",").trim()} ${last.trim()}`.trim();
    })
    .filter(Boolean);

  let etAl = false;
  if (names[names.length - 1]?.toLowerCase() === "others") {
    names.pop();
    etAl = true;
  }
  if (names.length > MAX_LISTED_AUTHORS) {
    names.splice(3);
    etAl = true;
  }

  if (etAl) return `${names.join(", ")}, et al.`;
  if (names.length <= 2) return names.join(" and ");
  return `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`;
}

function withPeriod(text: string) {
  return /[.?!]$/.test(text) ? text : `${text}.`;
}

function isUrl(value: string | undefined): value is string {
  return !!value && /^https?:\/\//.test(value.trim());
}

function linkLabel(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function venueOf({ type, fields }: BibEntry): string | undefined {
  const isArxiv = (fields.archiveprefix ?? fields.eprinttype ?? "").toLowerCase() === "arxiv";
  const howpublished = fields.howpublished && !isUrl(fields.howpublished) ? fields.howpublished : undefined;
  return (
    fields.journal ||
    fields.booktitle ||
    fields.institution ||
    (isArxiv ? "arXiv preprint" : undefined) ||
    (type === "phdthesis" ? `PhD thesis, ${fields.school ?? ""}`.replace(/, $/, "") : undefined) ||
    fields.school ||
    fields.publisher ||
    howpublished
  );
}

function linkOf({ fields }: BibEntry): { url: string; label: string } | undefined {
  const isArxiv = (fields.archiveprefix ?? fields.eprinttype ?? "").toLowerCase() === "arxiv";
  if (fields.eprint && isArxiv) {
    return { url: `https://arxiv.org/abs/${fields.eprint}`, label: `arXiv:${fields.eprint}` };
  }
  if (fields.doi) {
    return { url: `https://doi.org/${fields.doi}`, label: `doi:${fields.doi}` };
  }
  if (isUrl(fields.url)) {
    return { url: fields.url, label: linkLabel(fields.url) };
  }
  if (isUrl(fields.howpublished)) {
    return { url: fields.howpublished, label: linkLabel(fields.howpublished) };
  }
  const arxivId = `${fields.journal ?? ""} ${fields.note ?? ""}`.match(/arXiv:(\d{4}\.\d{4,5})/i)?.[1];
  if (arxivId) return { url: `https://arxiv.org/abs/${arxivId}`, label: `arXiv:${arxivId}` };
  return undefined;
}

/** "Authors. **Title.** In *Venue*, Year. [link]" */
function formatEntry(entry: BibEntry): PhrasingContent[] {
  const { fields } = entry;
  const nodes: PhrasingContent[] = [];

  const authors = formatAuthors(fields.author ?? fields.editor);
  if (authors) nodes.push({ type: "text", value: `${withPeriod(authors)} ` });

  nodes.push({ type: "strong", children: [{ type: "text", value: withPeriod(fields.title || entry.key) }] });

  const venue = venueOf(entry);
  const isConference = entry.type === "inproceedings" || entry.type === "conference";
  if (venue) {
    nodes.push({ type: "text", value: isConference ? " In " : " " });
    nodes.push({ type: "emphasis", children: [{ type: "text", value: venue }] });
    nodes.push({ type: "text", value: fields.year ? `, ${fields.year}.` : "." });
  } else if (fields.year) {
    nodes.push({ type: "text", value: ` ${fields.year}.` });
  }

  if (fields.note) nodes.push({ type: "text", value: ` ${withPeriod(fields.note)}` });

  const link = linkOf(entry);
  if (link) {
    nodes.push({ type: "text", value: " " });
    nodes.push({ type: "link", url: link.url, children: [{ type: "text", value: link.label }] });
  }

  return nodes;
}

/** Splits a text node into text + footnote references, or returns null if it has no known citations. */
function splitCitations(text: string, entries: Record<string, BibEntry>, cited: string[]): PhrasingContent[] | null {
  const nodes: PhrasingContent[] = [];
  let last = 0;
  let found = false;

  for (const match of text.matchAll(CITATION_GROUP)) {
    const keys = match[1].split(";").map((part) => CITATION_KEY.exec(part.trim())?.[1]);
    if (keys.some((key) => !key)) continue;

    const missing = keys.filter((key) => !entries[key as string]);
    if (missing.length > 0) {
      console.warn(`[citations] Unknown BibTeX key(s): ${missing.join(", ")}`);
      continue;
    }

    found = true;
    const index = match.index ?? 0;
    if (index > last) nodes.push({ type: "text", value: text.slice(last, index) });
    for (const key of keys as string[]) {
      if (!cited.includes(key)) cited.push(key);
      nodes.push({ type: "footnoteReference", identifier: citationId(key), label: citationId(key) });
    }
    last = index + match[0].length;
  }

  if (!found) return null;
  if (last < text.length) nodes.push({ type: "text", value: text.slice(last) });
  return nodes;
}

/**
 * Turns `[@key]` into GFM footnote references backed by BibTeX entries, so citations
 * share the existing footnote numbering, back-links and "References" section.
 */
export default function remarkCitations({ entries }: RemarkCitationsOptions) {
  return (tree: Root) => {
    if (Object.keys(entries).length === 0) return;
    const cited: string[] = [];

    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined || parent.type === "link" || parent.type === "linkReference") return;
      const replacement = splitCitations(node.value, entries, cited);
      if (!replacement) return;
      (parent.children as PhrasingContent[]).splice(index, 1, ...replacement);
      return [SKIP, index + replacement.length];
    });

    for (const key of cited) {
      const definition: FootnoteDefinition = {
        type: "footnoteDefinition",
        identifier: citationId(key),
        label: citationId(key),
        children: [{ type: "paragraph", children: formatEntry(entries[key]) }],
      };
      tree.children.push(definition);
    }
  };
}
