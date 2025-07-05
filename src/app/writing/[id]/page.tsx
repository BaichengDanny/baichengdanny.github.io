import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Article {
  id: string;
  title: string;
  year: number;
  description: string;
  date: string;
  content: string;
}

// Sample articles metadata
const articlesMetadata: Record<string, Omit<Article, "content">> = {
  "machines-ruthless-efficiency": {
    id: "machines-ruthless-efficiency",
    title: "Machines of Ruthless Efficiency",
    year: 2025,
    description: "Future LLMs have the potential to cause significant harm due to their ruthless efficiency.",
    date: "2025-01-15"
  },
  "sample": {
    id: "sample",
    title: "Sample Article",
    year: 2025,
    description: "This is a sample article for demonstration.",
    date: "2025-01-01"
  }
};

// Sample markdown content
const sampleMarkdownContent: Record<string, string> = {
  "machines-ruthless-efficiency": `# Machines of Ruthless Efficiency

Future LLMs have the potential to cause significant harm due to their ruthless efficiency.

## The Problem
As large language models become more capable, they also become more efficient at achieving their goals.`,

  "sample": `# Sample Article

This is a sample article for demonstration purposes.

## Introduction
This demonstrates how articles work in the writing section.`
};

export async function generateStaticParams() {
  return Object.keys(articlesMetadata).map((id) => ({ id }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const metadata = articlesMetadata[id];

  if (!metadata || !sampleMarkdownContent[id]) {
    notFound();
  }

  const article = {
    ...metadata,
    content: sampleMarkdownContent[id]
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl serif">Writing</h1>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900">Main</Link>
              <Link href="/papers" className="text-gray-600 hover:text-gray-900">Papers</Link>
              <Link href="/talks" className="text-gray-600 hover:text-gray-900">Talks</Link>
              <Link href="/code" className="text-gray-600 hover:text-gray-900">Code</Link>
              <Link href="/writing" className="text-gray-600 hover:text-gray-900">Writing</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 fancy">
        <div className="mb-6">
          <Link href="/writing" className="text-red-600 hover:text-red-800 text-sm">← Back to Writing</Link>
        </div>

        <article className="prose prose-lg max-w-none fancy">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({children}) => <h1 className="text-3xl font-bold serif mb-6">{children}</h1>,
              h2: ({children}) => <h2 className="text-2xl font-bold serif mt-8 mb-4">{children}</h2>,
              h3: ({children}) => <h3 className="text-xl font-bold serif mt-6 mb-3">{children}</h3>,
              p: ({children}) => <p className="text-lg leading-relaxed mb-4">{children}</p>,
              a: ({href, children}) => (
                <a href={href} className="text-red-600 hover:text-red-800">{children}</a>
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>

        <div className="mt-8 pt-6 border-t text-sm text-gray-500 fancy">
          <p>Published: {article.date} | Year: {article.year}</p>
        </div>
      </div>
    </div>
  );
}
