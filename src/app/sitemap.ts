import type { MetadataRoute } from "next";
import { getAllArticles } from "../lib/articles";
import { SITE_URL } from "../lib/constants";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, priority: 1 },
    { url: `${SITE_URL}/papers/`, priority: 0.8 },
    { url: `${SITE_URL}/talks/`, priority: 0.8 },
    { url: `${SITE_URL}/writing/`, priority: 0.8 },
    { url: `${SITE_URL}/doc/CV_Danny.pdf`, priority: 0.8 },
    { url: `${SITE_URL}/doc/Week_3_Meeting_SDS.pdf`, priority: 0.64 },
  ];

  const articles: MetadataRoute.Sitemap = getAllArticles()
    .filter((article) => !article.draft)
    .map((article) => ({
      url: `${SITE_URL}/writing/${article.id}/`,
      lastModified: article.updated ?? article.date,
      priority: 0.64,
    }));

  return [...pages, ...articles];
}
