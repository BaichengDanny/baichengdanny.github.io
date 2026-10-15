import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TableOfContents } from "../../../components/TableOfContents";
import Comments from "../../../components/Comments";
import Footer from "../../../components/Footer";
import SiteHeader from "../../../components/SiteHeader";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import ArticleBody from "../../../components/article/ArticleBody";
import ReadingProgress from "../../../components/article/ReadingProgress";
import { AUTHOR_NAME, SITE_NAME } from "../../../lib/constants";
import { formatReadingTime } from "../../../utils/readingTime";
import { formatDate } from "../../../utils/date";
import {
  getAdjacentArticles,
  getAllArticles,
  getArticle,
  getRelatedArticles,
  htmlLang,
  type ArticleMeta,
} from "../../../lib/articles";

type PageProps = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = getArticle(id);
  if (!article) return {};

  const url = `/writing/${article.id}/`;
  return {
    title: article.title,
    description: article.description || undefined,
    keywords: article.tags,
    authors: [{ name: AUTHOR_NAME }],
    alternates: { canonical: url },
    robots: article.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      images: ["/image/head.jpg"],
      title: article.title,
      description: article.description || undefined,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [AUTHOR_NAME],
      tags: article.tags,
      locale: article.lang === "zh" ? "zh_CN" : "en_US",
    },
    twitter: {
      card: "summary",
      title: article.title,
      description: article.description || undefined,
    },
  };
}

const tagLinkClass =
  "px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors";

// Plain <a> (full page load) so the list page reads the filter from the URL on mount.
function filterHref(key: "tag" | "category", value: string) {
  return `/writing/?${key}=${encodeURIComponent(value)}`;
}

function ArticleNavCard({ article, direction }: { article: ArticleMeta; direction: "previous" | "next" }) {
  const isNext = direction === "next";
  const Icon = isNext ? ChevronRight : ChevronLeft;
  return (
    <Link
      href={`/writing/${article.id}`}
      className={`group flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:border-red-300 dark:hover:border-red-700 transition-colors ${
        isNext ? "flex-row-reverse text-right" : ""
      }`}
    >
      <Icon
        aria-hidden="true"
        className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform group-hover:text-red-600 dark:group-hover:text-red-400 ${
          isNext ? "group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"
        }`}
      />
      <div className="min-w-0">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{isNext ? "Next" : "Previous"}</div>
        <div className="text-red-600 dark:text-red-400 font-medium break-words">{article.title}</div>
      </div>
    </Link>
  );
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) {
    notFound();
  }

  const { newer, older } = getAdjacentArticles(article.id);
  const related = getRelatedArticles(article);
  const lang = htmlLang(article.lang);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <ReadingProgress targetId="article-body" />
      <SiteHeader title="Writing" current="writing" titleAs="p" />

      <div className="max-w-6xl mx-auto px-4 pt-4 pb-2 md:pt-8 md:pb-4">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1 min-w-0 max-w-none lg:max-w-4xl fancy">
            <div className="mb-4 md:mb-6">
              <Link href="/writing" className="group inline-flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">
                <ArrowLeft aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Back to Writing
              </Link>
            </div>

            {/* Article Header */}
            <header lang={lang} className="mb-6 md:mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
              {article.draft && (
                <span className="inline-block mb-3 px-2 py-0.5 text-xs font-medium rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  Draft — hidden in production
                </span>
              )}
              <h1 className={`text-2xl md:text-3xl lg:text-4xl font-bold serif dark:text-gray-100 break-words leading-tight ${article.subtitle ? "mb-1 md:mb-2" : "mb-3 md:mb-4"}`}>{article.title}</h1>
              {article.subtitle && (
                <p className="mb-3 md:mb-4 text-lg md:text-xl italic text-gray-600 dark:text-gray-300 leading-snug">{article.subtitle}</p>
              )}
              <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-gray-600 dark:text-gray-400">
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {article.updated && article.updated !== article.date && (
                  <>
                    <span>•</span>
                    <span>Updated <time dateTime={article.updated}>{formatDate(article.updated)}</time></span>
                  </>
                )}
                <span>•</span>
                <span>{formatReadingTime(article.readingMinutes)}</span>
                <span>•</span>
                <span>{article.words} words</span>
              </div>
              {article.description && article.description !== article.subtitle && (
                <p className="mt-2 md:mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300 italic leading-relaxed">{article.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-3 md:mt-4">
                {article.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                    <a
                      href={filterHref("category", article.category)}
                      className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                    >
                      {article.category}
                    </a>
                  </div>
                )}

                {article.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <a key={tag} href={filterHref("tag", tag)} className={tagLinkClass}>
                          #{tag}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </header>

            <div className="lg:hidden">
              <TableOfContents items={article.headings} variant="inline" />
            </div>

            <article
              id="article-body"
              lang={lang}
              className="article-prose article-prose-gray dark:article-prose-invert max-w-none article-prose-code:before:content-none article-prose-code:after:content-none article-prose-img:my-4"
            >
              <ArticleBody content={article.content} bibliography={article.bibliography} />
            </article>

            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200 dark:border-gray-700 text-xs md:text-sm text-gray-500 dark:text-gray-400">
              <p>
                Published: <time dateTime={article.date}>{formatDate(article.date)}</time>
                {article.updated && article.updated !== article.date && (
                  <> | Last updated: <time dateTime={article.updated}>{formatDate(article.updated)}</time></>
                )}
              </p>
            </div>

            {(newer || older) && (
              <nav aria-label="More articles" className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>{older && <ArticleNavCard article={older} direction="previous" />}</div>
                <div>{newer && <ArticleNavCard article={newer} direction="next" />}</div>
              </nav>
            )}

            {related.length > 0 && (
              <section className="mt-10">
                <h2 className="text-lg md:text-xl font-bold serif dark:text-gray-100 mb-4">Related Articles</h2>
                <ul className="space-y-3">
                  {related.map(item => (
                    <li key={item.id} className="border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                      <Link href={`/writing/${item.id}`} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                        {item.title}
                      </Link>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {formatDate(item.date)} · {item.category}
                      </div>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <Comments articleId={article.id} lang={lang} />
          </div>

          <aside className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents items={article.headings} />
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
