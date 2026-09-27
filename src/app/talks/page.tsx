'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useMemo } from "react";
import { EnlargedImageModal } from "../../components/EnlargedImageModal";
import { ThemeToggle } from "../../components/ThemeToggle";
import Footer from "../../components/Footer";
import { CV_URL } from "../../lib/constants";

const talkLinkClass =
  "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm underline-offset-2 hover:underline";

function isValidLink(url?: string) {
  return Boolean(url && url.trim() !== "" && url !== "#");
}

interface Talk {
  id: string;
  title: string;
  type: string;
  venue: string;
  location: string;
  year: number;
  month: string;
  description?: string;
  photo?: string;
  photoAlt?: string;
  links: {
    slides?: string;
    video?: string;
    paper?: string;
  };
}

function getTalkLinks(talk: Talk) {
  return [
    isValidLink(talk.links.slides) ? { label: "Slides", href: talk.links.slides! } : null,
    isValidLink(talk.links.video) ? { label: "Video", href: talk.links.video! } : null,
    isValidLink(talk.links.paper) ? { label: "Paper", href: talk.links.paper! } : null,
  ].filter((link): link is { label: string; href: string } => link !== null);
}

function getTalkTitleHref(talk: Talk) {
  const links = getTalkLinks(talk);
  return links[0]?.href;
}

// Sample talks data
const talksData: Talk[] = [
  {
    id: "study-guide-cs-2024",
    title: "A Study Guide for Computer Science",
    type: "Tutorial",
    venue: "SDS AA Meeting",
    location: "Shenzhen, China",
    year: 2024,
    month: "September",
    description: "A comprehensive overview of computer science study in university and experience sharing at the third AA Meeting for SDS Group 13.",
    links: { slides: "https://baichengdanny.github.io/doc/Week_3_Meeting_SDS.pdf", video: "#", paper: "#" }
  },
  {
    id: "mcp-meeting-2025",
    title: "Introduction to Model Context Protocol (MCP)",
    type: "Tutorial",
    venue: "SCLBD Group Meeting",
    location: "Shenzhen, China",
    year: 2025,
    month: "June",
    description: "An introduction to the Model Context Protocol (MCP), focusing on the basic concepts and comparison with traditional function calling.",
    links: { slides: "https://drive.google.com/file/d/1pN31ulZDlV7HWNHjqIDnF6AGyZ3Ba5Q6/view?usp=sharing", video: "#", paper: "#" }
  },
  {
    id: "crebench-2026",
    title: "IIIS AI Safety Lunch: CREBench",
    type: "Invited Talk",
    venue: "IIIS, Tsinghua University",
    location: "Beijing, China",
    year: 2026,
    month: "September",
    description: "Invited talk on CREBench, a benchmark for evaluating LLM's capability of cryptographic binary reverse engineering (COLM 2026).",
    links: { slides: "https://drive.google.com/file/d/1sp5C4ChqoXHI28QJgttKHIr7f6_g51w5/view?usp=sharing", video: "#", paper: "https://arxiv.org/pdf/2604.03750" },
    photo: "/image/iiis_safety_lunch.jpg",
  },
  {
    id: "adapaction-2026",
    title: "GDSIG CVPR Pre-Conference Symposium: AdapAction",
    type: "Invited Talk",
    venue: "Sun Yat-sen University",
    location: "Guangzhou, China",
    year: 2026,
    month: "April",
    description: "Invited talk on AdapAction, a novel backdoor attack against LLM-based GUI agents (CVPR 2026).",
    links: { slides: "https://drive.google.com/file/d/1x29KhQDpXOxB7viigM7LKl03ImFNYTBF/view?usp=sharing", video: "https://www.wizsci.com/live/yr0bGP5", paper: "https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_AdapAction_Adaptive_Target_Action_Backdoor_Attack_against_GUI_Agents_CVPR_2026_paper.pdf" },
    photo: "/image/GDSIG.jpg",
  },
  {
    id: "iam-2026",
    title: "Introduction to Indentity and Access Management (IAM)",
    type: "Tutorial",
    venue: "CSC6202: Selected Topics in CS II (Computer Security)",
    location: "Shenzhen, China",
    year: 2026,
    month: "January",
    description: "All you need to know about Identity and Access Management (IAM).",
    links: { slides: "https://drive.google.com/file/d/1CDW0kS0xr6HLESk3q88W3vsb_Jz6Wg9Z/view?usp=sharing", video: "#", paper: "#" }
  },
];

export default function TalksPage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  // Get all unique types and years
  const allTypes = useMemo(() => {
    const types = talksData.map(talk => talk.type);
    return [...new Set(types)].sort();
  }, []);

  const allYears = useMemo(() => {
    const years = talksData.map(talk => talk.year);
    return [...new Set(years)].sort((a, b) => b - a);
  }, []);

  // Filter talks based on selected type and year
  const filteredTalks = useMemo(() => {
    return talksData.filter(talk => {
      const typeMatch = selectedType === 'all' || talk.type === selectedType;
      const yearMatch = selectedYear === 'all' || talk.year === selectedYear;
      return typeMatch && yearMatch;
    });
  }, [selectedType, selectedYear]);

  // Group talks by year
  const groupedTalks = useMemo(() => {
    return filteredTalks.reduce((acc, talk) => {
      if (!acc[talk.year]) {
        acc[talk.year] = [];
      }
      acc[talk.year].push(talk);
      return acc;
    }, {} as Record<number, Talk[]>);
  }, [filteredTalks]);

  const years = Object.keys(groupedTalks).map(Number).sort((a, b) => b - a);

  const clearFilters = () => {
    setSelectedType('all');
    setSelectedYear('all');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl serif dark:text-gray-100 font-bold">Talks</h1>
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Desktop Navigation */}
              <nav className="hidden md:flex space-x-6 lg:space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Main</Link>
                <Link href="/papers" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Papers</Link>
                <Link href="/talks" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Talks</Link>
                <Link href={CV_URL} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">CV</Link>
                <Link href="/writing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Writing</Link>
              </nav>

              {/* Mobile Navigation */}
              <nav className="flex md:hidden space-x-3 text-sm">
                <Link href="/" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Main</Link>
                <Link href="/papers" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Papers</Link>
                <Link href={CV_URL} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">CV</Link>
                <Link href="/writing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Writing</Link>
              </nav>

              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4 fancy">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <span className="text-sm font-medium dark:text-gray-300">
              Filters {filteredTalks.length !== talksData.length && `(${filteredTalks.length} results)`}
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
                      All ({talksData.length})
                    </button>
                    {allYears.map(year => {
                      const count = talksData.filter(t => t.year === year).length;
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

                {/* Type Filter */}
                <div>
                  <div className="font-bold dark:text-gray-300 mb-2">By Type</div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedType('all')}
                      className={`text-left px-3 py-2 rounded border text-sm ${
                        selectedType === 'all'
                          ? 'bg-red-600 text-white border-red-600'
                          : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border-gray-300 dark:border-gray-600'
                      }`}
                    >
                      All ({talksData.length})
                    </button>
                    {allTypes.map(type => {
                      const count = talksData.filter(t => t.type === type).length;
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedType(type)}
                          className={`text-left px-3 py-2 rounded border text-sm ${
                            selectedType === type
                              ? 'bg-red-600 text-white border-red-600'
                              : 'bg-white dark:bg-gray-700 text-red-600 dark:text-red-400 border-gray-300 dark:border-gray-600'
                          }`}
                        >
                          {type} ({count})
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Clear Filters Button */}
                {(selectedType !== 'all' || selectedYear !== 'all') && (
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
              {(selectedType !== 'all' || selectedYear !== 'all') && (
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
                    {selectedType !== 'all' && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Type: {selectedType}
                      </div>
                    )}
                    {selectedYear !== 'all' && (
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        Year: {selectedYear}
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    Showing {filteredTalks.length} talk{filteredTalks.length !== 1 ? 's' : ''}
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
                    All Years ({talksData.length})
                  </button>
                  {allYears.map(year => {
                    const count = talksData.filter(t => t.year === year).length;
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

              {/* Type Filter */}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="font-bold dark:text-gray-300 mb-2">By Type</div>
                <div className="flex flex-col space-y-1">
                  <button
                    onClick={() => setSelectedType('all')}
                    className={`text-left ${
                      selectedType === 'all'
                        ? 'text-red-600 dark:text-red-400 font-medium'
                        : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
                    }`}
                  >
                    All Types ({talksData.length})
                  </button>
                  {allTypes.map(type => {
                    const count = talksData.filter(t => t.type === type).length;
                    return (
                      <button
                        key={type}
                        onClick={() => setSelectedType(type)}
                        className={`text-left ${
                          selectedType === type
                            ? 'text-red-600 dark:text-red-400 font-medium'
                            : 'text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300'
                        }`}
                      >
                        {type} ({count})
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
              {filteredTalks.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg">No talks found with current filters.</p>
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
                      {groupedTalks[year].map(talk => {
                        const talkLinks = getTalkLinks(talk);
                        const titleHref = getTalkTitleHref(talk);

                        return (
                        <div key={talk.id} className="border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                                <h3 className="text-lg text-red-600 dark:text-red-400">
                                  {titleHref ? (
                                    <a href={titleHref} className="hover:text-red-800 dark:hover:text-red-300">
                                      {talk.title}
                                    </a>
                                  ) : (
                                    <span className="text-gray-900 dark:text-gray-100">{talk.title}</span>
                                  )}
                                </h3>
                                <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full font-medium">
                                  {talk.type}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                <strong>{talk.type}</strong> · {talk.venue} · {talk.location} · {talk.month} {talk.year}
                              </p>
                              {talkLinks.length > 0 && (
                                <div className="flex flex-wrap items-center gap-2 mb-2">
                                  {talkLinks.map((link, index) => (
                                    <span key={link.label} className="inline-flex items-center gap-2">
                                      {index > 0 && <span className="text-gray-400">|</span>}
                                      <a href={link.href} className={talkLinkClass}>
                                        {link.label}
                                      </a>
                                    </span>
                                  ))}
                                </div>
                              )}
                              {talk.description && (
                                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                  {talk.description}
                                </p>
                              )}
                            </div>

                            {talk.photo && (
                              <div className="shrink-0 w-full sm:w-44 md:w-52">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setEnlargedImage({
                                      src: talk.photo!,
                                      alt: talk.photoAlt ?? `${talk.title} photo`,
                                    })
                                  }
                                  className="block w-full cursor-zoom-in rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                  aria-label={`Enlarge photo for ${talk.title}`}
                                >
                                  <Image
                                    src={talk.photo}
                                    alt={talk.photoAlt ?? `${talk.title} photo`}
                                    width={208}
                                    height={156}
                                    className="w-full h-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:scale-[1.02]"
                                  />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {enlargedImage && (
        <EnlargedImageModal
          src={enlargedImage.src}
          alt={enlargedImage.alt}
          variant="fit"
          showHint={false}
          onClose={() => setEnlargedImage(null)}
        />
      )}
    </div>
  );
}
