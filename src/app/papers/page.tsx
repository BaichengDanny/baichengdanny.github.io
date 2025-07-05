'use client';

import type { Metadata } from "next";
import Link from "next/link";
import { useState, useMemo } from "react";
import { ThemeToggle } from "../../components/ThemeToggle";

interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  description: string;
  links: {
    pdf?: string;
    code?: string;
    demo?: string;
  };
  awards?: string[];
}

// Sample papers data
const papersData: Paper[] = [
  {
    id: "fl-brain-2024",
    title: "Federated Learning-Based EfficientNet in Brain Tumor Classification",
    authors: "Baicheng Chen",
    venue: "EMITI",
    year: 2024,
    description: "",
    links: { pdf: "https://www.scitepress.org/Papers/2024/129509/129509.pdf", code: "#" },
    awards: []
  }
];

export default function PapersPage() {
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Get all unique venues and years
  const allVenues = useMemo(() => {
    const venues = papersData.map(paper => paper.venue);
    return [...new Set(venues)].sort();
  }, []);

  const allYears = useMemo(() => {
    const years = papersData.map(paper => paper.year);
    return [...new Set(years)].sort((a, b) => b - a);
  }, []);

  // Filter papers based on selected venue and year
  const filteredPapers = useMemo(() => {
    return papersData.filter(paper => {
      const venueMatch = selectedVenue === 'all' || paper.venue === selectedVenue;
      const yearMatch = selectedYear === 'all' || paper.year === selectedYear;
      return venueMatch && yearMatch;
    });
  }, [selectedVenue, selectedYear]);

  // Group papers by year
  const groupedPapers = useMemo(() => {
    return filteredPapers.reduce((acc, paper) => {
      if (!acc[paper.year]) {
        acc[paper.year] = [];
      }
      acc[paper.year].push(paper);
      return acc;
    }, {} as Record<number, Paper[]>);
  }, [filteredPapers]);

  const years = Object.keys(groupedPapers).map(Number).sort((a, b) => b - a);

  const clearFilters = () => {
    setSelectedVenue('all');
    setSelectedYear('all');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl serif dark:text-gray-100">Papers</h1>
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Main</Link>
                <Link href="/papers" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Papers</Link>
                <Link href="/talks" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Talks</Link>
                <Link href="https://baichengdanny.github.io/doc/CV_Danny.pdf" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">CV</Link>
                <Link href="/writing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Writing</Link>
              </nav>

              {/* Mobile Navigation */}
              <nav className="flex md:hidden space-x-3 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Main</Link>
                <Link href="/talks" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Talks</Link>
                <Link href="https://baichengdanny.github.io/doc/CV_Danny.pdf" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">CV</Link>
                <Link href="/writing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Writing</Link>
              </nav>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8 fancy">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <span className="text-sm font-medium dark:text-gray-300">
              Filters {filteredPapers.length !== papersData.length && `(${filteredPapers.length} results)`}
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

        {/* Mobile Filters Panel */}
        {showMobileFilters && (
          <div className="lg:hidden mb-6">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
              <div className="text-sm space-y-4 serif">
                {/* Year Filter */}
                <div>
                  <div className="font-bold dark:text-gray-300 mb-2">By Year</div>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setSelectedYear('all')}
                      className={`text-left px-3 py-2 rounded border text-sm ${
                        selectedYear === 'all'
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      All ({papersData.length})
                    </button>
                    {allYears.map(year => {
                      const count = papersData.filter(p => p.year === year).length;
                      return (
                        <button
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={`text-left px-3 py-2 rounded border text-sm ${
                            selectedYear === year
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {year} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Venue Filter */}
                <div>
                  <div className="font-bold dark:text-gray-300 mb-2">By Venue</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedVenue('all')}
                      className={`text-left px-3 py-2 rounded border text-sm ${
                        selectedVenue === 'all'
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      All ({papersData.length})
                    </button>
                    {allVenues.map(venue => {
                      const count = papersData.filter(p => p.venue === venue).length;
                      return (
                        <button
                          key={venue}
                          onClick={() => setSelectedVenue(venue)}
                          className={`text-left px-3 py-2 rounded border text-sm ${
                            selectedVenue === venue
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {venue} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(selectedVenue !== 'all' || selectedYear !== 'all') && (
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={clearFilters}
                      className="w-full px-3 py-2 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Navigation - Desktop */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="text-sm space-y-4 serif sticky top-4">
              {/* Active Filters */}
              {(selectedVenue !== 'all' || selectedYear !== 'all') && (
                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium dark:text-gray-300">Active Filters</span>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {selectedVenue !== 'all' && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Venue: {selectedVenue}
                      </div>
                    )}
                    {selectedYear !== 'all' && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Year: {selectedYear}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Showing {filteredPapers.length} paper{filteredPapers.length !== 1 ? 's' : ''}
                  </p>
                </div>
              )}

              {/* Year Filter */}
              <div>
                <div className="font-bold dark:text-gray-300 mb-2">By Year</div>
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => setSelectedYear('all')}
                    className={`text-left ${
                      selectedYear === 'all'
                        ? 'text-red-600 dark:text-red-400 font-medium'
                        : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
                    }`}
                  >
                    All Years ({papersData.length})
                  </button>
                  {allYears.map(year => {
                    const count = papersData.filter(p => p.year === year).length;
                    return (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`text-left ${
                          selectedYear === year
                            ? 'text-red-600 dark:text-red-400 font-medium'
                            : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
                        }`}
                      >
                        {year} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Venue Filter */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="font-bold dark:text-gray-300 mb-2">By Venue</div>
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => setSelectedVenue('all')}
                    className={`text-left ${
                      selectedVenue === 'all'
                        ? 'text-red-600 dark:text-red-400 font-medium'
                        : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
                    }`}
                  >
                    All Venues ({papersData.length})
                  </button>
                  {allVenues.map(venue => {
                    const count = papersData.filter(p => p.venue === venue).length;
                    return (
                      <button
                        key={venue}
                        onClick={() => setSelectedVenue(venue)}
                        className={`text-left ${
                          selectedVenue === venue
                            ? 'text-red-600 dark:text-red-400 font-medium'
                            : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
                        }`}
                      >
                        {venue} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              <div>
                <h1 className="text-lg font-bold serif mb-4">List of Publications</h1>
              </div>
              {filteredPapers.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No papers found with current filters.</p>
                  <button
                    onClick={clearFilters}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm mt-2"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                years.map(year => (
                  <div key={year} id={year.toString()}>
                    <h2 className="text-xl font-bold serif mb-4 dark:text-gray-100">{year}</h2>
                    <div className="space-y-6">
                      {groupedPapers[year].map(paper => (
                        <div key={paper.id} className="border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                            <h3 className="text-lg text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
                              <a href={paper.links.pdf || "#"}>
                                {paper.title}
                              </a>
                            </h3>
                            <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full font-medium">
                              {paper.venue}
                            </span>
                          </div>
                          <p
                            className="text-sm text-gray-600 dark:text-gray-400 mb-2"
                            dangerouslySetInnerHTML={{
                              __html: paper.authors.replace(/Baicheng Chen/g, '<strong>Baicheng Chen</strong>')
                            }}
                          />
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              <strong>{paper.venue} {paper.year}</strong>
                            </p>
                            {paper.links.pdf && (
                              <a href={paper.links.pdf} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">PDF</a>
                            )}
                            {paper.links.code && (
                              <>
                                <span className="text-gray-400">|</span>
                                <a href={paper.links.code} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">Code</a>
                              </>
                            )}
                            {paper.links.demo && (
                              <>
                                <span className="text-gray-400">|</span>
                                <a href={paper.links.demo} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">Demo</a>
                              </>
                            )}
                          </div>
                          {paper.awards && paper.awards.length > 0 && (
                            <div className="flex flex-wrap gap-1 mb-2">
                              {paper.awards.map((award, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 text-xs bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full"
                                >
                                  {award}
                                </span>
                              ))}
                            </div>
                          )}
                          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            {paper.description}
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
    </div>
  );
}
