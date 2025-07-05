import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from "next/link";
import { TableOfContents } from "../../../components/TableOfContents";
import { ThemeToggle } from "../../../components/ThemeToggle";
import { calculateReadingTime, formatReadingTime } from "../../../utils/readingTime";
import { notFound } from "next/navigation";
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

interface Article {
  id: string;
  title: string;
  year: number;
  description: string;
  date: string;
  content: string;
  tags: string[];
  category: string;
}

// Get all article IDs from the articles directory
function getArticleIds(): string[] {
  const articlesDirectory = path.join(process.cwd(), 'public', 'articles');

  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(articlesDirectory);
  return filenames
    .filter(name => name.endsWith('.md'))
    .map(name => name.replace(/\.md$/, ''));
}

// Read and parse a single article
function getArticle(id: string): Article | null {
  try {
    const articlesDirectory = path.join(process.cwd(), 'public', 'articles');
    const fullPath = path.join(articlesDirectory, `${id}.md`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      id,
      title: data.title || id,
      year: data.year || new Date().getFullYear(),
      description: data.description || '',
      date: data.date || new Date().toISOString().split('T')[0],
      content,
      tags: data.tags || [],
      category: data.category || 'Uncategorized'
    };
  } catch (error) {
    console.error(`Error reading article ${id}:`, error);
    return null;
  }
}

export async function generateStaticParams() {
  const articleIds = getArticleIds();
  return articleIds.map((id) => ({ id }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = getArticle(id);

  if (!article) {
    notFound();
  }

  const readingStats = calculateReadingTime(article.content);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif dark:text-gray-100">Writing</h1>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Main</Link>
                <Link href="/papers" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Papers</Link>
                <Link href="/talks" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Talks</Link>
                <Link href="/code" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Code</Link>
                <Link href="/writing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Writing</Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Article Content */}
          <div className="flex-1 max-w-4xl fancy">
            <div className="mb-6">
              <Link href="/writing" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">← Back to Writing</Link>
            </div>

            {/* Article Header */}
            <div className="mb-8 pb-4 border-b border-gray-200 dark:border-gray-700">
              <h1 className="text-4xl font-bold serif mb-4 dark:text-gray-100">{article.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{article.date}</span>
                <span>•</span>
                <span>{formatReadingTime(readingStats.minutes)}</span>
                <span>•</span>
                <span>{readingStats.words} words</span>
              </div>
              {article.description && (
                <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 italic">{article.description}</p>
              )}

              {/* Category and Tags */}
              <div className="flex flex-wrap items-center gap-4 mt-4">
                {article.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                    <span className="px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                      {article.category}
                    </span>
                  </div>
                )}

                {article.tags && article.tags.length > 0 && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Tags:</span>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[[rehypeKatex, { strict: false }]]}
            components={{
              h1: ({children}) => {
                const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
                return <h1 id={id} className="text-3xl font-bold serif mb-6 dark:text-gray-100">{children}</h1>;
              },
              h2: ({children}) => {
                const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
                return <h2 id={id} className="text-2xl font-bold serif mt-8 mb-4 dark:text-gray-100">{children}</h2>;
              },
              h3: ({children}) => {
                const id = String(children).toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
                return <h3 id={id} className="text-xl font-bold serif mt-6 mb-3 dark:text-gray-100">{children}</h3>;
              },
              p: ({children}) => <p className="text-lg leading-relaxed mb-4 dark:text-gray-300">{children}</p>,
              a: ({href, children}) => (
                <a href={href} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">{children}</a>
              ),
              ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2 dark:text-gray-300">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2 dark:text-gray-300">{children}</ol>,
              li: ({children}) => <li className="text-lg leading-relaxed dark:text-gray-300">{children}</li>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4 dark:text-gray-300">{children}</blockquote>
              ),
              code: ({children, className}) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';

                if (!match) {
                  return <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded font-mono text-sm dark:text-gray-300">{children}</code>;
                }

                return (
                  <SyntaxHighlighter
                    style={tomorrow}
                    language={language}
                    PreTag="div"
                    className="rounded-lg my-4"
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                );
              }
            }}
          >
            {article.content}
          </ReactMarkdown>
            </article>

            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
              <p>Published: {article.date} | Year: {article.year}</p>
            </div>
          </div>

          {/* Table of Contents Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents content={article.content} />
          </div>
        </div>
      </div>
    </div>
  );
}
