export interface BibEntry {
  type: string;
  key: string;
  fields: Record<string, string>;
}

const SKIPPED_TYPES = new Set(["comment", "string", "preamble"]);

const ACCENT_MARKS: Record<string, string> = {
  '"': "\u0308",
  "'": "\u0301",
  "`": "\u0300",
  "^": "\u0302",
  "~": "\u0303",
};

const SPECIAL_LETTERS: Record<string, string> = {
  L: "Ł",
  l: "ł",
  o: "ø",
  O: "Ø",
  ss: "ß",
  aa: "å",
  AA: "Å",
  ae: "æ",
  AE: "Æ",
  i: "ı",
};

const OGONEK: Record<string, string> = { a: "ą", A: "Ą", e: "ę", E: "Ę" };

/** Turns common LaTeX markup in field values into plain text. */
function cleanValue(value: string): string {
  return value
    .replace(/\\k\s*\{?([A-Za-z])\}?/g, (_, letter: string) => OGONEK[letter] ?? letter)
    .replace(/\\(["'`^~])\s*\{?\\([ij])\}?/g, (_, mark: string, letter: string) =>
      `${letter}${ACCENT_MARKS[mark]}`.normalize("NFC"),
    )
    .replace(/\{?\\(["'`^~])\{?([A-Za-z])\}?\}?/g, (_, mark: string, letter: string) =>
      `${letter}${ACCENT_MARKS[mark]}`.normalize("NFC"),
    )
    .replace(/\\(ss|aa|AA|ae|AE|L|l|o|O|i)(?![A-Za-z])\s?/g, (_, name: string) => SPECIAL_LETTERS[name])
    .replace(/\\([&%_$#])/g, "$1")
    .replace(/\\[A-Za-z]+\s*/g, "")
    .replace(/---/g, "\u2014")
    .replace(/--/g, "\u2013")
    .replace(/~/g, " ")
    .replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseFields(body: string): Record<string, string> {
  const fields: Record<string, string> = {};
  const namePattern = /\s*([\w-]+)\s*=\s*/y;
  let i = 0;

  while (i < body.length) {
    namePattern.lastIndex = i;
    const nameMatch = namePattern.exec(body);
    if (!nameMatch) break;
    i = namePattern.lastIndex;

    let value = "";
    if (body[i] === "{") {
      const start = i;
      let depth = 0;
      for (; i < body.length; i++) {
        if (body[i] === "{") depth++;
        else if (body[i] === "}" && --depth === 0) {
          i++;
          break;
        }
      }
      value = body.slice(start + 1, i - 1);
    } else if (body[i] === '"') {
      const end = body.indexOf('"', i + 1);
      value = body.slice(i + 1, end === -1 ? body.length : end);
      i = end === -1 ? body.length : end + 1;
    } else {
      const bare = /[^,\s}]+/y;
      bare.lastIndex = i;
      const bareMatch = bare.exec(body);
      if (bareMatch) {
        value = bareMatch[0];
        i = bare.lastIndex;
      }
    }

    fields[nameMatch[1].toLowerCase()] = cleanValue(value);

    const comma = body.indexOf(",", i);
    if (comma === -1) break;
    i = comma + 1;
  }

  return fields;
}

/** Minimal BibTeX parser: supports `{}`/`""`/bare values; ignores @string macros and `#` concatenation. */
export function parseBibtex(source: string): Record<string, BibEntry> {
  const entries: Record<string, BibEntry> = {};
  const entryStart = /@(\w+)\s*\{/g;
  let match: RegExpExecArray | null;

  while ((match = entryStart.exec(source)) !== null) {
    const type = match[1].toLowerCase();
    const start = entryStart.lastIndex;
    let depth = 1;
    let i = start;
    for (; i < source.length && depth > 0; i++) {
      if (source[i] === "{") depth++;
      else if (source[i] === "}") depth--;
    }
    entryStart.lastIndex = i;

    if (SKIPPED_TYPES.has(type)) continue;

    const body = source.slice(start, i - 1);
    const comma = body.indexOf(",");
    if (comma === -1) continue;

    const key = body.slice(0, comma).trim();
    if (key) entries[key] = { type, key, fields: parseFields(body.slice(comma + 1)) };
  }

  return entries;
}
