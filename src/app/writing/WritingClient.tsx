'use client';

import Link from "next/link";
import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import { ChevronDown, Rss } from 'lucide-react';
import type { ArticleSearchEntry } from '../../lib/articles';
import { formatReadingTime } from '../../utils/readingTime';
import { formatDate } from '../../utils/date';

interface WritingClientProps {
  articles: ArticleSearchEntry[];
}

const VISIBLE_TAG_COUNT = 8;

const inputClass =
  "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm bg-white dark:bg-gray-800 dark:text-gray-300";

const tagButtonClass = (active: boolean) =>
  `px-2 py-1 text-xs rounded-full border transition-colors ${
    active
      ? 'bg-red-600 text-white border-red-600'
      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700'
  }`;

interface FiltersPanelProps {
  idPrefix: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  allCategories: string[];
  allTags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
  resultCount: number;
}

function FiltersPanel({
  idPrefix,
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  allCategories,
  allTags,
  selectedTags,
  onToggleTag,
  hasActiveFilters,
  onClearAll,
  resultCount,
}: FiltersPanelProps) {
  const [showAllTags, setShowAllTags] = useState(false);
  const visibleTags = showAllTags
    ? allTags
    : allTags.filter((tag, index) => index < VISIBLE_TAG_COUNT || selectedTags.includes(tag));
  const hiddenTagCount = allTags.length - visibleTags.length;

  return (
    <>
      <div>
        <label htmlFor={`${idPrefix}search`} className="block text-sm font-medium mb-2 dark:text-gray-300">
          Search Articles
        </label>
        <input
          id={`${idPrefix}search`}
          type="search"
          placeholder="Search titles, tags, full text..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor={`${idPrefix}category`} className="block text-sm font-medium mb-2 dark:text-gray-300">
          Category
        </label>
        <div className="relative">
          <select
            id={`${idPrefix}category`}
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            className={`${inputClass} appearance-none pr-9 cursor-pointer`}
          >
            <option value="all">All Categories</option>
            {allCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400"
          />
        </div>
      </div>

      {allTags.length > 0 && (
        <div>
          <div className="text-sm font-medium mb-2 dark:text-gray-300">Tags</div>
          <div className="flex flex-wrap gap-2">
            {visibleTags.map(tag => (
              <button
                key={tag}
                type="button"
                onClick={() => onToggleTag(tag)}
                aria-pressed={selectedTags.includes(tag)}
                className={tagButtonClass(selectedTags.includes(tag))}
              >
                {tag}
              </button>
            ))}
          </div>
          {(hiddenTagCount > 0 || showAllTags) && allTags.length > VISIBLE_TAG_COUNT && (
            <button
              type="button"
              onClick={() => setShowAllTags(!showAllTags)}
              className="mt-2 text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              {showAllTags ? 'Show less' : `Show all (${allTags.length})`}
            </button>
          )}
        </div>
      )}

      {hasActiveFilters && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium dark:text-gray-300">Active Filters</span>
            <button
              type="button"
              onClick={onClearAll}
              className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear All
            </button>
          </div>
          <div className="space-y-1">
            {searchTerm && (
              <div className="text-xs text-gray-600 dark:text-gray-400">Search: "{searchTerm}"</div>
            )}
            {selectedCategory !== 'all' && (
              <div className="text-xs text-gray-600 dark:text-gray-400">Category: {selectedCategory}</div>
            )}
            {selectedTags.length > 0 && (
              <div className="text-xs text-gray-600 dark:text-gray-400">Tags: {selectedTags.join(', ')}</div>
            )}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Found {resultCount} article{resultCount !== 1 ? 's' : ''}
          </p>
        </div>
      )}
    </>
  );
}

export default function WritingClient({ articles }: WritingClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [urlLoaded, setUrlLoaded] = useState(false);

  // Read filters from the URL after mount so the static HTML still lists every article.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearchTerm(params.get('q') ?? '');
    setSelectedCategory(params.get('category') ?? 'all');
    setSelectedTags(params.getAll('tag'));
    setUrlLoaded(true);
  }, []);

  useEffect(() => {
    if (!urlLoaded) return;
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('q', searchTerm.trim());
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    for (const tag of selectedTags) params.append('tag', tag);
    const query = params.toString();
    const url = `${window.location.pathname}${query ? `?${query}` : ''}`;
    if (url !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(null, '', url);
    }
  }, [urlLoaded, searchTerm, selectedCategory, selectedTags]);

  const allCategories = useMemo(() => {
    const categories = articles.map(article => article.category).filter(Boolean);
    return [...new Set(categories)].sort();
  }, [articles]);

  // Most-used first, so the collapsed sidebar shows the most useful tags.
  const allTags = useMemo(() => {
    const counts = new Map<string, number>();
    for (const tag of articles.flatMap(article => article.tags)) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
    return [...counts.keys()].sort((a, b) => counts.get(b)! - counts.get(a)! || a.localeCompare(b));
  }, [articles]);

  const fuse = useMemo(() => {
    return new Fuse(articles, {
      keys: [
        { name: 'title', weight: 0.3 },
        { name: 'description', weight: 0.2 },
        { name: 'tags', weight: 0.2 },
        { name: 'category', weight: 0.1 },
        { name: 'searchText', weight: 0.2 },
      ],
      threshold: 0.3,
      // Without this, matches far into the full text are scored as misses.
      ignoreLocation: true,
      minMatchCharLength: 2,
    });
  }, [articles]);

  const filteredArticles = useMemo(() => {
    let result = articles;

    if (searchTerm.trim()) {
      result = fuse.search(searchTerm.trim()).map(r => r.item);
    }

    if (selectedCategory !== 'all') {
      result = result.filter(article => article.category === selectedCategory);
    }

    if (selectedTags.length > 0) {
      result = result.filter(article =>
        selectedTags.some(tag => article.tags.includes(tag))
      );
    }

    return result;
  }, [articles, searchTerm, selectedCategory, selectedTags, fuse]);

  const groupedArticles = useMemo(() => {
    return filteredArticles.reduce((acc, article) => {
      if (!acc[article.year]) acc[article.year] = [];
      acc[article.year].push(article);
      return acc;
    }, {} as Record<number, ArticleSearchEntry[]>);
  }, [filteredArticles]);

  const years = Object.keys(groupedArticles).map(Number).sort((a, b) => b - a);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedTags([]);
  };

  const hasActiveFilters = Boolean(searchTerm) || selectedCategory !== 'all' || selectedTags.length > 0;

  const panelProps = {
    searchTerm,
    onSearchChange: setSearchTerm,
    selectedCategory,
    onCategoryChange: setSelectedCategory,
    allCategories,
    allTags,
    selectedTags,
    onToggleTag: toggleTag,
    hasActiveFilters,
    onClearAll: clearAllFilters,
    resultCount: filteredArticles.length,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8 pb-4 fancy">
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          type="button"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          aria-expanded={showMobileFilters}
          className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <span className="text-sm font-medium dark:text-gray-300">
            Search & Filters {filteredArticles.length !== articles.length && `(${filteredArticles.length} results)`}
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-4 w-4 text-gray-500 transition-transform ${showMobileFilters ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Navigation - Desktop */}
        <div className="hidden lg:block lg:col-span-1">
          <div className="text-sm space-y-6 serif sticky top-4">
            <FiltersPanel idPrefix="" {...panelProps} />

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

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="text-xs text-gray-500 dark:text-gray-400 space-y-2">
                <p className="font-medium">I'll keep updating the content ... </p>
                <a href="/feed.xml" className="inline-flex items-center gap-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  <Rss className="h-3.5 w-3.5" /> Subscribe via RSS
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div className="lg:hidden col-span-1 mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm space-y-4 serif">
                <FiltersPanel idPrefix="mobile-" {...panelProps} />
                <a href="/feed.xml" className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                  <Rss className="h-3.5 w-3.5" /> Subscribe via RSS
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Right Content */}
        <div className="lg:col-span-3">
          <div className="space-y-8">
            {filteredArticles.length === 0 ? (
              <div className="text-center py-12">
                {hasActiveFilters ? (
                  <>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">No articles found with current filters.</p>
                    <button
                      type="button"
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
                      Add .md files to the <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">content/articles/</code> directory.
                    </p>
                  </>
                )}
              </div>
            ) : (
              years.map(year => (
                <div key={year} id={year.toString()} className="scroll-mt-4">
                  <h2 className="text-xl font-bold serif mb-4 dark:text-gray-100">{year}</h2>
                  <div className="space-y-6">
                    {groupedArticles[year].map(article => (
                      <div key={article.id} className="border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                          <h3 className="text-lg text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                            <Link href={`/writing/${article.id}`}>
                              {article.title}
                            </Link>
                            {article.draft && (
                              <span className="ml-2 align-middle px-1.5 py-0.5 text-xs font-medium rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Draft
                              </span>
                            )}
                          </h3>
                          {article.category && (
                            <button
                              type="button"
                              onClick={() => setSelectedCategory(article.category)}
                              className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
                            >
                              {article.category}
                            </button>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          <time dateTime={article.date}>{formatDate(article.date)}</time>
                          <span className="mx-2">•</span>
                          {formatReadingTime(article.readingMinutes)}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                          {article.description}
                        </p>
                        {article.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {article.tags.map(tag => (
                              <button
                                key={tag}
                                type="button"
                                onClick={() => toggleTag(tag)}
                                aria-pressed={selectedTags.includes(tag)}
                                className={`px-2 py-1 text-xs rounded-full transition-colors ${
                                  selectedTags.includes(tag)
                                    ? 'bg-red-600 text-white'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                }`}
                              >
                                #{tag}
                              </button>
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
