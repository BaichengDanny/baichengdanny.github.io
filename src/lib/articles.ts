import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { visit } from "unist-util-visit";
import { toString as mdastToString } from "mdast-util-to-string";
import type { Heading } from "mdast";
import { calculateReadingTime } from "../utils/readingTime";
import { FOOTNOTE_SECTION_ID, REFERENCES_LABEL } from "./footnotes";
import { parseBibtex, type BibEntry } from "./bibtex";
import remarkCitations from "./remarkCitations";

const CONTENT_DIR = path.join(process.cwd(), "content");
const ARTICLES_DIR = path.join(CONTENT_DIR, "articles");
const GLOBAL_BIB = path.join(CONTENT_DIR, "references.bib");

// Drafts are visible in `next dev` but excluded from production builds.
const SHOW_DRAFTS = process.env.NODE_ENV === "development";

const TOC_MAX_DEPTH = 4;

export type ArticleLang = "en" | "zh";

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

export interface ArticleMeta {
  id: string;
  title: string;
  description: string;
  /** Shown under the title. Falls back to nothing; `description` stays the list/SEO blurb. */
  subtitle?: string;
  /** YYYY-MM-DD */
  date: string;
  /** YYYY-MM-DD, set via the `updated` frontmatter field */
  updated?: string;
  year: number;
  category: string;
  tags: string[];
  lang: ArticleLang;
  draft: boolean;
  readingMinutes: number;
  words: number;
}

export interface Article extends ArticleMeta {
  content: string;
  headings: TocItem[];
  /** BibTeX entries available to `[@key]` citations in this article. */
  bibliography: Record<string, BibEntry>;
}

export interface ArticleSearchEntry extends ArticleMeta {
  searchText: string;
}

function normalizeDate(value: unknown): string | undefined {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }
  if (typeof value === "string") {
    const match = value.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})/);
    if (match) {
      return `${match[1]}-${match[2].padStart(2, "0")}-${match[3].padStart(2, "0")}`;
    }
  }
  return undefined;
}

function stripCode(markdown: string): string {
  return markdown.replace(/```[\s\S]*?```/g, " ").replace(/`[^`\n]*`/g, " ");
}

function detectLang(markdown: string): ArticleLang {
  const prose = stripCode(markdown);
  const cjkChars = prose.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const latinWords = prose.match(/[A-Za-z]+/g)?.length ?? 0;
  return cjkChars > latinWords ? "zh" : "en";
}

function toSearchText(markdown: string): string {
  return markdown
    .replace(/```[a-zA-Z0-9_-]*\n?/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*_>`~|$\\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Must produce the same ids as rehype-slug: both use github-slugger over the
 * plain text of every heading in document order.
 */
function extractHeadings(markdown: string, bibliography: Record<string, BibEntry>): TocItem[] {
  const tree = unified().use(remarkParse).use(remarkGfm).use(remarkMath).parse(markdown);
  remarkCitations({ entries: bibliography })(tree);
  const slugger = new GithubSlugger();
  const items: TocItem[] = [];

  visit(tree, "heading", (node: Heading) => {
    const title = mdastToString(node, { includeImageAlt: false }).trim();
    const id = slugger.slug(title);
    if (node.depth <= TOC_MAX_DEPTH && title) {
      items.push({ id, title, level: node.depth });
    }
  });

  let hasCitations = false;
  visit(tree, "footnoteReference", () => {
    hasCitations = true;
  });
  if (hasCitations) {
    items.push({ id: FOOTNOTE_SECTION_ID, title: REFERENCES_LABEL, level: 2 });
  }

  return items;
}

/** Drops a leading `# Heading` that just repeats the frontmatter title. */
function stripDuplicateTitle(markdown: string, title: string): string {
  const match = markdown.match(/^\s*#[ \t]+(.+?)[ \t#]*(?:\r?\n|$)/);
  if (!match) return markdown;
  const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");
  return normalize(match[1]) === normalize(title) ? markdown.slice(match[0].length) : markdown;
}

const bibCache = new Map<string, Record<string, BibEntry>>();

function readBibFile(fullPath: string): Record<string, BibEntry> {
  if (!SHOW_DRAFTS && bibCache.has(fullPath)) return bibCache.get(fullPath)!;
  const entries = fs.existsSync(fullPath) ? parseBibtex(fs.readFileSync(fullPath, "utf8")) : {};
  if (!fs.existsSync(fullPath)) console.warn(`[citations] Bibliography not found: ${fullPath}`);
  bibCache.set(fullPath, entries);
  return entries;
}

/** `content/references.bib` plus any files in the `bibliography` frontmatter field (paths relative to `content/`). */
function loadBibliography(extra: unknown): Record<string, BibEntry> {
  const extraFiles = (Array.isArray(extra) ? extra : extra ? [extra] : []).map(String);
  const files = [GLOBAL_BIB, ...extraFiles.map((file) => path.join(CONTENT_DIR, file))];
  return Object.assign(
    {},
    ...files.filter((file) => file !== GLOBAL_BIB || fs.existsSync(file)).map(readBibFile),
  );
}

function parseArticleFile(id: string): Article | null {
  const fullPath = path.join(ARTICLES_DIR, `${id}.md`);
  if (!fs.existsSync(fullPath)) return null;

  try {
    const { data, content: rawContent } = matter(fs.readFileSync(fullPath, "utf8"));
    const content = stripDuplicateTitle(rawContent, String(data.title ?? ""));
    const date = normalizeDate(data.date) ?? new Date().toISOString().slice(0, 10);
    const reading = calculateReadingTime(content);
    const bibliography = loadBibliography(data.bibliography);

    return {
      id,
      title: data.title || id,
      description: data.description || "",
      subtitle: typeof data.subtitle === "string" && data.subtitle.trim() ? data.subtitle.trim() : undefined,
      date,
      updated: normalizeDate(data.updated),
      year: Number(date.slice(0, 4)),
      category: data.category || "Uncategorized",
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
      lang: data.lang === "zh" || data.lang === "en" ? data.lang : detectLang(content),
      draft: data.draft === true,
      readingMinutes: reading.minutes,
      words: reading.words,
      content,
      headings: extractHeadings(content, bibliography),
      bibliography,
    };
  } catch (error) {
    console.warn(`Could not parse article ${id}:`, error);
    return null;
  }
}

function isVisible(article: ArticleMeta): boolean {
  return SHOW_DRAFTS || !article.draft;
}

function toMeta({ content, headings, bibliography, ...meta }: Article): ArticleMeta {
  return meta;
}

let cache: Article[] | null = null;

function loadArticles(): Article[] {
  if (cache && !SHOW_DRAFTS) return cache;
  if (!fs.existsSync(ARTICLES_DIR)) return [];

  const articles = fs
    .readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => parseArticleFile(name.replace(/\.md$/, "")))
    .filter((article): article is Article => article !== null && isVisible(article))
    .sort((a, b) => b.date.localeCompare(a.date) || a.title.localeCompare(b.title));

  cache = articles;
  return articles;
}

/** Newest first. */
export function getAllArticles(): ArticleMeta[] {
  return loadArticles().map(toMeta);
}

export function getSearchEntries(): ArticleSearchEntry[] {
  return loadArticles().map((article) => ({
    ...toMeta(article),
    searchText: toSearchText(article.content),
  }));
}

export function getArticle(id: string): Article | null {
  return loadArticles().find((article) => article.id === id) ?? null;
}

export function getAdjacentArticles(id: string): { newer?: ArticleMeta; older?: ArticleMeta } {
  const articles = getAllArticles();
  const index = articles.findIndex((article) => article.id === id);
  if (index === -1) return {};
  return { newer: articles[index - 1], older: articles[index + 1] };
}

export function getRelatedArticles(article: ArticleMeta, limit = 3): ArticleMeta[] {
  return getAllArticles()
    .filter((other) => other.id !== article.id)
    .map((other) => ({
      other,
      score:
        other.tags.filter((tag) => article.tags.includes(tag)).length * 2 +
        (other.category === article.category ? 1 : 0),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || b.other.date.localeCompare(a.other.date))
    .slice(0, limit)
    .map(({ other }) => other);
}

export function htmlLang(lang: ArticleLang): string {
  return lang === "zh" ? "zh-CN" : "en";
}
