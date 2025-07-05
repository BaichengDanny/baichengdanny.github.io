'use client';

import Link from "next/link";
import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';

interface Article {
  id: string;
  title: string;
  year: number;
  description: string;
  date: string;
  filename: string;
  content?: string;
}

interface WritingClientProps {
  articles: Article[];
}

export default function WritingClient({ articles }: WritingClientProps) {
  const [searchTerm, setSearchTerm] = useState('');

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(articles, {
      keys: [
        { name: 'title', weight: 0.4 },
        { name: 'description', weight: 0.3 },
        { name: 'content', weight: 0.2 },
        { name: 'year', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }, [articles]);

  // Filter articles based on search term
  const filteredArticles = useMemo(() => {
    if (!searchTerm.trim()) {
      return articles;
    }

    const results = fuse.search(searchTerm);
    return results.map(result => result.item);
  }, [articles, searchTerm, fuse]);

  // Group articles by year
  const groupedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.year]) {
      acc[article.year] = [];
    }
    acc[article.year].push(article);
    return acc;
  }, {} as Record<number, Article[]>);

  const years = Object.keys(groupedArticles).map(Number).sort((a, b) => b - a);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fancy">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Navigation */}
        <div className="lg:col-span-1">
          <div className="text-sm space-y-4 serif sticky top-4">
            {/* Search Box */}
            <div className="mb-6">
              <label htmlFor="search" className="block text-sm font-medium mb-2">
                Search Articles
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by title, description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
              {searchTerm && (
                <p className="text-xs text-gray-500 mt-1">
                  Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>

            {/* Year navigation */}
            <div className="font-bold">By Year</div>
            <div className="flex flex-col space-y-1">
              {years.map(year => (
                <a key={year} href={`#${year}`} className="text-red-600 hover:text-red-800">
                  {year} ({groupedArticles[year].length})
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
          <div className="space-y-8">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                {searchTerm ? (
                  <>
                    <p className="text-gray-500 text-lg">No articles found for "{searchTerm}".</p>
                    <button
                      onClick={() => setSearchTerm('')}
                      className="text-red-600 hover:text-red-800 text-sm mt-2"
                    >
                      Clear search
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 text-lg">No articles found.</p>
                    <p className="text-gray-400 text-sm mt-2">
                      Add .md files to the <code className="bg-gray-100 px-1 rounded">public/articles/</code> directory.
                    </p>
                  </>
                )}
              </div>
            ) : (
              years.map(year => (
                <div key={year} id={year.toString()}>
                  <h2 className="text-xl font-bold serif mb-4">{year}</h2>
                  <div className="space-y-6">
                    {groupedArticles[year].map(article => (
                      <div key={article.id} className="border-l-2 border-gray-100 pl-4">
                        <h3 className="text-lg text-red-600 hover:text-red-800 mb-2">
                          <Link href={`/writing/${article.id}`}>
                            {article.title}
                          </Link>
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {article.date}
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                          {article.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
