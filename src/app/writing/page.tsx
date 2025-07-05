"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  year: number;
  description: string;
  date: string;
  filename: string;
}

export default function WritingPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // Sample articles that would be read from the articles folder
  // In a real implementation, this would be generated at build time
  useEffect(() => {
    const sampleArticles: Article[] = [
      {
        id: "machines-ruthless-efficiency",
        title: "Machines of Ruthless Efficiency",
        year: 2025,
        description: "Future LLMs have the potential to cause significant harm due to their ruthless efficiency. I'm worried this will happen, and discuss the ways in which it might.",
        date: "2025-01-15",
        filename: "machines-ruthless-efficiency.md"
      },
      {
        id: "ai-forecasting-retrospective",
        title: "AI forecasting retrospective",
        year: 2025,
        description: "By studying the results of my forecasting survey from last year, I find almost everyone is over confident.",
        date: "2025-01-10",
        filename: "ai-forecasting-retrospective.md"
      },
      {
        id: "forecasting-future-ai",
        title: "Forecasting the future of AI",
        year: 2024,
        description: "A set of 30 questions about the future of AI you can answer, and I'll tell you how you did in a few years.",
        date: "2024-12-01",
        filename: "forecasting-future-ai.md"
      },
      {
        id: "how-i-use-ai",
        title: "How I Use AI",
        year: 2024,
        description: "Fifty different examples of how I've used LLMs to meaningfully improve my ability to write code and perform research.",
        date: "2024-11-15",
        filename: "how-i-use-ai.md"
      },
      {
        id: "chess-llm",
        title: "Playing chess with large language models",
        year: 2023,
        description: "I built a bot to play chess by querying a text language model. It sees the sequence of moves in order (as text!), and predicts which move comes next. It's better than me.",
        date: "2023-08-20",
        filename: "chess-llm.md"
      },
      {
        id: "doom-clone-javascript",
        title: "Yet Another Doom Clone (In 13kb of JavaScript)",
        year: 2019,
        description: "exactly what it sounds like; an entry for js13k 2019.",
        date: "2019-09-15",
        filename: "doom-clone-javascript.md"
      }
    ];

    setArticles(sampleArticles);
    setLoading(false);
  }, []);

  const groupedArticles = articles.reduce((acc, article) => {
    if (!acc[article.year]) {
      acc[article.year] = [];
    }
    acc[article.year].push(article);
    return acc;
  }, {} as Record<number, Article[]>);

  const years = Object.keys(groupedArticles).map(Number).sort((a, b) => b - a);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-500">Loading articles...</div>
      </div>
    );
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
              <Link href="/code" className="text-gray-600 hover:text-gray-900 fancy">Code</Link>
              <Link href="/writing" className="text-gray-600 hover:text-gray-900 fancy">Writing</Link>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 fancy">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation */}
          <div className="lg:col-span-1">
            <div className="text-sm space-y-2 serif sticky top-4">
              <div className="font-bold">By Year</div>
              <div className="flex flex-col space-y-1">
                {years.map(year => (
                  <a key={year} href={`#${year}`} className="text-red-600 hover:text-red-800">
                    {year}
                  </a>
                ))}
              </div>

              {/* Instructions */}
              <div className="mt-6 pt-4 border-t">
                <div className="text-xs text-gray-500 space-y-2">
                  <p className="font-medium">How to add articles:</p>
                  <p>1. Place .md files in <code className="bg-gray-100 px-1 rounded">public/articles/</code></p>
                  <p>2. Include frontmatter with title, date, year, description</p>
                  <p>3. Rebuild the site to see changes</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            {/* Articles List */}
            <div className="space-y-8">
              {years.map(year => (
                <div key={year} id={year.toString()}>
                  <h2 className="text-xl font-bold serif mb-4 fancy">{year}</h2>
                  <div className="space-y-4">
                    {groupedArticles[year].map(article => (
                      <div key={article.id}>
                        <Link
                          href={`/writing/${article.id}`}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          {article.title}
                        </Link>
                        :{" "}
                        {article.description}
                        <br />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
