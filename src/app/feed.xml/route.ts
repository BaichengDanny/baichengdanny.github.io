import { getAllArticles } from "../../lib/articles";
import { AUTHOR_NAME, SITE_NAME, SITE_URL } from "../../lib/constants";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toRfc822(date: string): string {
  return new Date(`${date}T00:00:00Z`).toUTCString();
}

export function GET() {
  const articles = getAllArticles().filter((article) => !article.draft);
  const lastBuildDate = articles[0] ? toRfc822(articles[0].updated ?? articles[0].date) : new Date().toUTCString();

  const items = articles
    .map((article) => {
      const url = `${SITE_URL}/writing/${article.id}/`;
      const categories = [article.category, ...article.tags]
        .map((category) => `      <category>${escapeXml(category)}</category>`)
        .join("\n");
      return `    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${toRfc822(article.date)}</pubDate>
      <description>${escapeXml(article.description)}</description>
${categories}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} — Writing`)}</title>
    <link>${SITE_URL}/writing/</link>
    <description>${escapeXml(`Notes, tutorials and essays by ${AUTHOR_NAME}.`)}</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
