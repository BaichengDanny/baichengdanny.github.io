'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../components/ThemeToggle";
import Footer from "../components/Footer";
import { CV_URL } from "../lib/constants";

/* ────────────────────────────────────────────
   Data Types
   ──────────────────────────────────────────── */

interface Publication {
  id: string;
  authors: string;          // "Baicheng Chen" will be auto-bolded
  title: string;
  venue: string;
  awards?: { text: string; note?: string }[];
  description: string;
  abstract?: string;
  links: {
    paper?: string;
    code?: { url: string; stars?: number };
    website?: string;
    dataset?: string;
  };
}

interface Experience {
  id: string;
  logo: string;
  organization: string;
  role: string;
  advisors?: { name: string; url?: string }[];
  advisorConnector?: string;  // e.g. "and"
  awards?: string[];
  customContent?: string;  // Optional custom content line
  dateRange: string;
}

interface NewsItem {
  date: string;
  content: string;
}

/* ────────────────────────────────────────────
   Sample Data — edit these to update the page
   ──────────────────────────────────────────── */

const newsItems: NewsItem[] = [
  { date: "2026.02:", content: "Happy to share that my first-author paper AdapAction got accepted by CVPR 2026! 🎉" },
  { date: "2025.07:", content: "My new personal website is now available! 🎉" },
];

const publications: Publication[] = [
  {
    id: "fl-brain-2024",
    authors: "Baicheng Chen, Mingda Zhang, Min Zhang, Haizhou Li, Baoyuan Wu",
    title: "AdapAction: Adaptive Target Action Backdoor Attack against GUI Agents",
    venue: "CVPR 2026",
    description: "A novel backdoor attack against LLM-based GUI agents",
    abstract: "Stay tuned...",
    links: {
      paper: "Stay tuned...",
    },
  },
  
];

const experiences: Experience[] = [
  {
    id: "cuhk-sds",
    logo: "https://baichengdanny.github.io/image/cuhksz.png",
    organization: "The Chinese University of Hong Kong, Shenzhen",
    role: "Undergraduate Student",
    customContent: "GPA: 3.81/4.0",
    dateRange: "2023.09 - Present",
  },
  {
    id: "ucb-summer",
    logo: "https://baichengdanny.github.io/image/ucb.jpg",
    organization: "University of California, Berkeley",
    role: "Visiting Student",
    customContent: "GPA: 4.0/4.0",
    dateRange: "2024.06 - 2024.08",
  },
];

/* ────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────── */

export default function Home() {
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set());

  const toggleAbstract = (id: string) => {
    setExpandedAbstracts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  /** Render an author string, bolding "Baicheng Chen" */
  const renderAuthors = (authors: string) => {
    return authors.replace(
      /Baicheng Chen/g,
      '<strong class="text-base dark:text-gray-100">Baicheng Chen</strong>'
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      {/* ── Header ── */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl md:text-2xl serif dark:text-gray-100 font-bold">Baicheng Chen / 陈柏成</h1>
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
                <Link href="/papers" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Papers</Link>
                <Link href="/talks" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Talks</Link>
                <Link href={CV_URL} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">CV</Link>
                <Link href="/writing" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Writing</Link>
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* ═══════ 1. About (float layout) ═══════ */}
        <h2 className="text-2xl font-bold serif mb-6 dark:text-gray-100 underline decoration-2 underline-offset-8">About</h2>
        <div>
          {/* Photo card — floats right on md+, centered on mobile */}
          <div className="mx-auto mb-6 w-64 sm:w-72 md:float-right md:ml-8 md:mb-4 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg text-center transition-colors">
              <div className="mb-4">
                <Image
                  src="https://baichengdanny.github.io/image/danny.jpg"
                  alt="Baicheng Chen"
                  width={200}
                  height={200}
                  className="rounded-lg mx-auto w-full h-auto"
                />
              </div>
              <div className="text-center fancy space-y-2">
                <div className="font-bold dark:text-gray-100">Baicheng Chen</div>
                <div className="dark:text-gray-300">3rd undergrad, CUHK-Shenzhen</div>
                <div className="text-sm dark:text-gray-400">baichengchen [at] link [dot] cuhk [dot] edu [dot] cn (preferred)</div>
                <div className="text-sm dark:text-gray-400">dannybaicheng [at] gmail [dot] com</div>
                <div className="flex justify-center space-x-2 text-sm">
                  <a href="https://github.com/BaichengDanny" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">GitHub</a>
                  <span>|</span> 
                  <a href="#" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Google Scholar</a>
                </div>
              </div>
            </div>
          </div>

          {/* Intro text — wraps around the floated photo */}
          <div className="prose prose-lg max-w-none fancy">
            <p className="text-lg leading-relaxed dark:text-gray-300">
              Hi!
              I am Baicheng Chen (Danny), a third-year undergraduate student majoring in Computer Science and Engineering (CSE) at the <a href="https://www.cuhk.edu.cn" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Chinese University of Hong Kong, Shenzhen</a>.
            </p>
            <br />
            <p className="text-lg leading-relaxed dark:text-gray-300">
              My research interests lie in the intersection of Trustworthy AI and Computer Security, focusing on the dual challenge of ensuring AI security while leveraging it for specialized security applications.
              Currently, I am working on Agentic AI security and the application of agent in cryptography.
            </p>
            <br />
            <p className="text-lg leading-relaxed dark:text-gray-300">
              I am fortunate to be advised by <a href="https://sites.google.com/site/baoyuanwu2015/" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Prof. Baoyuan Wu</a> at CUHK-Shenzhen.
              And I am also grateful to collaborate with Prof. Tianhao Wang (UVA) and Prof. Tianxing He (IIIS, THU).
            </p>
            <br />
            <p className="text-lg leading-relaxed dark:text-gray-300">
              <b>Currently, I am actively seeking for <span className="text-red-600">summer internship opportunities (2026 Summer)</span> and <span className="text-red-600">PhD positions (2027 Fall)</span> in the field of Trustworthy AI.</b> If you are interested in my research and would like to chat with me further, please <a href="mailto:baichengchen@link.cuhk.edu.cn" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">email me</a>.
            </p>
            <p className="text-lg leading-relaxed dark:text-gray-300">I am also open to any kind of collaborations and discussions, please feel free to reach out to me.</p>
          </div>

          {/* ═══════ 2. News (wraps around photo too) ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-6 dark:text-gray-100 underline decoration-2 underline-offset-8">🔥 News</h2>
            <div className="max-h-52 overflow-y-auto pr-2 scrollbar-thin">
              <div className="space-y-3">
                {newsItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                    <span className="text-lg dark:text-gray-300">
                      <strong>{item.date}</strong> {item.content}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ═══════ 3. Selected Publications ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-2 dark:text-gray-100 underline decoration-2 underline-offset-8">Selected Publications</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 mb-1">
              Only some of my papers are listed. See more on the{" "}
              <Link href="/papers" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Papers</Link>{" "}
              page or{" "}
              <a href="#" className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">Google Scholar</a>.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8">(* indicates equal contribution)</p>

            <div className="space-y-10">
            {publications.map((pub) => (
              <div key={pub.id}>
                {/* Authors */}
                <p
                  className="text-gray-600 dark:text-gray-400 mb-0.5"
                  dangerouslySetInnerHTML={{ __html: renderAuthors(pub.authors) }}
                />

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-0.5">{pub.title}</h3>

                {/* Venue */}
                <p className="italic text-gray-600 dark:text-gray-400 mb-0.5">{pub.venue}</p>

                {/* Awards */}
                {pub.awards &&
                  pub.awards.map((award, i) => (
                    <p key={i} className="mb-0.5">
                      <span className="font-bold text-red-700 dark:text-red-400">{award.text}</span>
                      {award.note && (
                        <span className="italic text-gray-600 dark:text-gray-400">, {award.note}</span>
                      )}
                    </p>
                  ))}

                {/* Description */}
                <p className="text-gray-700 dark:text-gray-300 mb-2">{pub.description}</p>

                {/* Link badges */}
                <div className="flex flex-wrap gap-2">
                  {pub.links.paper && (
                    <a
                      href={pub.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      Paper
                    </a>
                  )}
                  {pub.abstract && (
                    <button
                      onClick={() => toggleAbstract(pub.id)}
                      className={`inline-block px-3 py-1 text-sm border rounded-md transition-colors ${
                        expandedAbstracts.has(pub.id)
                          ? "border-red-400 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                          : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      Abstract
                    </button>
                  )}
                  {pub.links.code && (
                    <a
                      href={pub.links.code.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      Code{pub.links.code.stars !== undefined && pub.links.code.stars > 0 ? ` ★ ${pub.links.code.stars}` : ""}
                    </a>
                  )}
                  {pub.links.website && (
                    <a
                      href={pub.links.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      Website
                    </a>
                  )}
                  {pub.links.dataset && (
                    <a
                      href={pub.links.dataset}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      Dataset
                    </a>
                  )}
                </div>

                {/* Expanded abstract */}
                {expandedAbstracts.has(pub.id) && pub.abstract && (
                  <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm leading-relaxed text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {pub.abstract}
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* ═══════ 4. Experiences ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-8 dark:text-gray-100 underline decoration-2 underline-offset-8">Experiences</h2>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex items-start gap-5">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-14 h-14 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Image
                      src={exp.logo}
                      alt={exp.organization}
                      width={56}
                      height={56}
                      className="object-contain w-14 h-14"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1">
                      <div className="min-w-0">
                        <h3 className="font-bold text-gray-900 dark:text-gray-100">{exp.organization}</h3>
                        <p className="text-gray-600 dark:text-gray-400">{exp.role}</p>
                        {exp.advisors && exp.advisors.length > 0 && (
                          <p className="text-gray-600 dark:text-gray-400">
                            Advised by{" "}
                            {exp.advisors.map((a, i) => (
                              <span key={i}>
                                {i > 0 && ` ${exp.advisorConnector || "and"} `}
                                <a
                                  href={a.url || "#"}
                                  className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                                >
                                  {a.name}
                                </a>
                              </span>
                            ))}
                          </p>
                        )}
                        {exp.awards &&
                          exp.awards.map((award, i) => (
                            <p key={i} className="text-gray-400 dark:text-gray-500 text-sm">
                              {award}
                            </p>
                          ))}
                        {exp.customContent && (
                          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                            {exp.customContent}
                          </p>
                        )}
                      </div>
                      <span className="text-gray-400 dark:text-gray-500 text-sm whitespace-nowrap sm:ml-4 flex-shrink-0">
                        {exp.dateRange}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Clear float */}
          <div className="clear-both"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
