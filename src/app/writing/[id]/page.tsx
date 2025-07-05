import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from "next/link";
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
      content
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif">Writing</h1>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 fancy">Main</Link>
              <Link href="/papers" className="text-gray-600 hover:text-gray-900 fancy">Papers</Link>
              <Link href="/talks" className="text-gray-600 hover:text-gray-900 fancy">Talks</Link>
              <Link href="https://baichengdanny.github.io/doc/CV_Danny.pdf" className="text-gray-600 hover:text-gray-900 fancy">CV</Link>
              <Link href="/writing" className="text-gray-600 hover:text-gray-900 fancy">Writing</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 fancy">
        <div className="mb-6">
          <Link href="/writing" className="text-red-600 hover:text-red-800 text-sm">← Back to Writing</Link>
        </div>

        <article className="prose prose-lg max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkMath]}
            rehypePlugins={[[rehypeKatex, { strict: false }]]}
            components={{
              h1: ({children}) => <h1 className="text-3xl font-bold serif mb-6">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-bold serif mt-8 mb-4">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-bold serif mt-6 mb-3">{children}</h3>,
              p: ({children}) => <p className="text-lg leading-relaxed mb-4">{children}</p>,
              a: ({href, children}) => (
                <a href={href} className="text-red-600 hover:text-red-800">{children}</a>
              ),
              ul: ({children}) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
              ol: ({children}) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
              li: ({children}) => <li className="text-lg leading-relaxed">{children}</li>,
              blockquote: ({children}) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
              ),
              code: ({children, className}) => {
                const match = /language-(\w+)/.exec(className || '');
                const language = match ? match[1] : '';

                if (!match) {
                  return <code className="bg-gray-100 px-1 rounded font-mono text-sm">{children}</code>;
                }

                return (
                  <SyntaxHighlighter
                    style={tomorrow as any}
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

        <div className="mt-8 pt-6 border-t text-sm text-gray-500">
          <p>Published: {article.date} | Year: {article.year}</p>
          {article.description && (
            <p className="mt-2 italic">{article.description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
