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
  tags: string[];
  category: string;
}

interface WritingClientProps {
  articles: Article[];
}

export default function WritingClient({ articles }: WritingClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get all unique categories and tags
  const allCategories = useMemo(() => {
    const categories = articles.map(article => article.category).filter(Boolean);
    return [...new Set(categories)].sort();
  }, [articles]);

  const allTags = useMemo(() => {
    const tags = articles.flatMap(article => article.tags || []);
    return [...new Set(tags)].sort();
  }, [articles]);

  // Configure Fuse.js for fuzzy search
  const fuse = useMemo(() => {
    return new Fuse(articles, {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'content', weight: 0.1 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 },
        { name: 'year', weight: 0.1 }
      ],
      threshold: 0.3,
      includeScore: true,
    });
  }, [articles]);

  // Filter articles based on search term, category, and tags
  const filteredArticles = useMemo(() => {
    let result = articles;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchResults = fuse.search(searchTerm);
      result = searchResults.map(result => result.item);
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = result.filter(article => article.category === selectedCategory);
    }

    // Apply tags filter
    if (selectedTags.length > 0) {
      result = result.filter(article =>
        selectedTags.some(tag => article.tags?.includes(tag))
      );
    }

    return result;
  }, [articles, searchTerm, selectedCategory, selectedTags, fuse]);

  // Group articles by year
  const groupedArticles = filteredArticles.reduce((acc, article) => {
    if (!acc[article.year]) {
      acc[article.year] = [];
    }
    acc[article.year].push(article);
    return acc;
  }, {} as Record<number, Article[]>);

  const years = Object.keys(groupedArticles).map(Number).sort((a, b) => b - a);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 fancy">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <span className="text-sm font-medium dark:text-gray-300">
            Search & Filters {filteredArticles.length !== articles.length && `(${filteredArticles.length} results)`}
          </span>
          <svg
            className={`w-5 h-5 transform transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Navigation - Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="text-sm space-y-6 serif sticky top-4">
            {/* Search Box */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Search Articles
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by title, description, tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
              />
            </div>

            {/* Category Filter */}
            <div>
              <label htmlFor="category" className="block text-sm font-medium mb-2 dark:text-gray-300">
                Category
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
              >
                <option value="all">All Categories</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Tags Filter */}
            {allTags.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2 dark:text-gray-300">Tags</div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                        selectedTags.includes(tag)
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Active Filters */}
            {(searchTerm || selectedCategory !== 'all' || selectedTags.length > 0) && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium dark:text-gray-300">Active Filters</span>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1">
                  {searchTerm && (
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Search: "{searchTerm}"
                    </div>
                  )}
                  {selectedCategory !== 'all' && (
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Category: {selectedCategory}
                    </div>
                  )}
                  {selectedTags.length > 0 && (
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      Tags: {selectedTags.join(', ')}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                </p>
              </div>
            )}

            {/* Year navigation */}
            {years.length > 0 && (
              <div>
                <div className="font-bold dark:text-gray-300 mb-2">By Year</div>
                <div className="flex flex-col space-y-1">
                  {years.map(year => (
                    <a key={year} href={`#${year}`} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                      {year} ({groupedArticles[year].length})
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                {/* <p className="font-medium">How to add articles:</p>
                <p>1. Place .md files in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">public/articles/</code></p>
                <p>2. Include frontmatter with title, date, year, description, category, tags</p>
                <p>3. Rebuild the site to see changes</p> */}
                <p className="font-medium">I'll keep updating the content ... </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div className="lg:hidden col-span-1 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm space-y-4 serif">
                {/* Search Box */}
                <div>
                  <label htmlFor="mobile-search" className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Search Articles
                  </label>
                  <input
                    id="mobile-search"
                    type="text"
                    placeholder="Search by title, description, tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
                  />
                </div>

                {/* Category Filter */}
                <div>
                  <label htmlFor="mobile-category" className="block text-sm font-medium mb-2 dark:text-gray-300">
                    Category
                  </label>
                  <select
                    id="mobile-category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 dark:text-gray-300"
                  >
                    <option value="all">All Categories</option>
                    {allCategories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Tags Filter */}
                {allTags.length > 0 && (
                  <div>
                    <div className="text-sm font-medium mb-2 dark:text-gray-300">Tags</div>
                    <div className="flex flex-wrap gap-2">
                      {allTags.map(tag => (
                        <button
                          key={tag}
                          onClick={() => toggleTag(tag)}
                          className={`px-2 py-1 text-xs rounded-full border transition-colors ${
                            selectedTags.includes(tag)
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Filters */}
                {(searchTerm || selectedCategory !== 'all' || selectedTags.length > 0) && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium dark:text-gray-300">Active Filters</span>
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-1">
                      {searchTerm && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Search: "{searchTerm}"
                        </div>
                      )}
                      {selectedCategory !== 'all' && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Category: {selectedCategory}
                        </div>
                      )}
                      {selectedTags.length > 0 && (
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          Tags: {selectedTags.join(', ')}
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      Found {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Right Content */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                {searchTerm || selectedCategory !== 'all' || selectedTags.length > 0 ? (
                  <>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found with current filters.</p>
                    <button
                      onClick={clearAllFilters}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm mt-2"
                    >
                      Clear all filters
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found.</p>
                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                      Add .md files to the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">public/articles/</code> directory.
                    </p>
                  </>
                )}
              </div>
            ) : (
              years.map(year => (
                <div key={year} id={year.toString()}>
                  <h2 className="text-xl font-bold serif mb-4 dark:text-gray-100">{year}</h2>
                  <div className="space-y-6">
                    {groupedArticles[year].map(article => (
                      <div key={article.id} className="border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                            <Link href={`/writing/${article.id}`}>
                              {article.title}
                            </Link>
                          </h3>
                          {article.category && (
                            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                              {article.category}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {article.date}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                          {article.description}
                        </p>
                        {article.tags && article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map(tag => (
                              <span
                                key={tag}
                                className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
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
