'use client';

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { CodeLinkBadge } from "../components/CodeLinkBadge";
import { EnlargedImageModal } from "../components/EnlargedImageModal";
import { ThemeToggle } from "../components/ThemeToggle";
import Footer from "../components/Footer";
import { useGitHubStars } from "../hooks/useGitHubStars";
import { CV_URL } from "../lib/constants";

/* ────────────────────────────────────────────
   Data Types
   ──────────────────────────────────────────── */

interface Publication {
  id: string;
  authors: string;
  title: string;
  venue: string;
  teaserImage?: string;
  teaserImageAlt?: string;
  awards?: { text: string; note?: string }[];
  description: string;
  abstract?: string;
  links: {
    paper?: string;
    poster?: string;
    project?: string;
    code?: { url: string; stars?: number };
    website?: string;
    dataset?: string;
    extra?: { label: string; url: string }[];
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
  content: ReactNode;
}

const inlineLinkClass =
  "text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline-offset-2 hover:underline";

const blueLinkClass =
  "text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline-offset-2 hover:underline";

const AWESOME_CYBERSEC_PAPERS_URL =
  "https://github.com/BaichengDanny/awesome-ai-for-cybersecurity-papers";

function GitHubRepoStars({ url }: { url: string }) {
  const stars = useGitHubStars([url])[url];
  if (stars === undefined || stars <= 0) return null;

  return (
    <span className="ml-0.5 text-sm text-gray-500 dark:text-gray-400 tabular-nums">
      (⭐ {stars.toLocaleString()})
    </span>
  );
}

/* ────────────────────────────────────────────
   Sample Data — edit these to update the page
   ──────────────────────────────────────────── */

const newsItems: NewsItem[] = [
  {
    date: "2026.08:",
    content: (
      <>
        Released <span className="italic">Awesome AI for Cybersecurity Papers</span>
        {" "}<GitHubRepoStars url={AWESOME_CYBERSEC_PAPERS_URL} />, please{" "}
        <a href={AWESOME_CYBERSEC_PAPERS_URL} className={inlineLinkClass} target="_blank" rel="noopener noreferrer">
          check it out
        </a>! 👀
      </>
    ),
  },
  {
    date: "2026.08:",
    content: (
      <>
        Received a sponsored travel grant from{" "}
        <a href="https://colmweb.org/" className={inlineLinkClass} target="_blank" rel="noopener noreferrer">
          COLM 2026
        </a>
        ! ❤️
      </>
    ),
  },
  {
    date: "2026.07:",
    content: (
      <>
        Happy to share that my first-author paper{" "}
        <a href="https://jams-zhou-james.github.io/CREBench/" className={inlineLinkClass} target="_blank" rel="noopener noreferrer">
          CREBench
        </a>{" "}
        got accepted by{" "}
        <a href="https://colmweb.org/" className={inlineLinkClass} target="_blank" rel="noopener noreferrer">
          COLM 2026
        </a>
        ! See you in San Francisco! 🎉
      </>
    ),
  },
  {
    date: "2026.07:",
    content: (
      <>
        <a href="https://arxiv.org/pdf/2607.14485" className={inlineLinkClass} target="_blank" rel="noopener noreferrer">
            SimPref
        </a>{" "}
        got accepted by{" "}
        <a href="https://waica2026.worldaic.com.cn/" className={inlineLinkClass} target="_blank" rel="noopener noreferrer">
          WAIC Academic 2026
        </a>{" "}
        (Acceptance Rate: 58/282 = 20.57%), congrets to Wenchang! 🎉
      </>
    ),
  },
  {
    date: "2026.02:",
    content: (
      <>
        Happy to share that my first-author paper{" "}
        <a
          href="https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_AdapAction_Adaptive_Target_Action_Backdoor_Attack_against_GUI_Agents_CVPR_2026_paper.pdf"
          className={inlineLinkClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          AdapAction
        </a>{" "}
        got accepted by{" "}
        <a href="https://cvpr.thecvf.com/" className={inlineLinkClass} target="_blank" rel="noopener noreferrer">
          CVPR 2026
        </a>
        ! 🎉
      </>
    ),
  },
  { date: "2025.07:", content: "My new personal website is now available! 🎉" },
];

const publications: Publication[] = [
  {
    id: "crebench-2026",
    title: "CREBench: Evaluating Large Language Models in Cryptographic Binary Reverse Engineering",
    authors: "Baicheng Chen*, Yu Wang*, Ziheng Zhou*, Xiangru Liu, Juanru Li, Yilei Chen, Tianxing He",
    venue: "COLM 2026",
    teaserImage: "/image/papers/crebench-2026.jpg",
    teaserImageAlt: "CREBench overview figure",
    description: "A benchmark to evaluate LLMs' capabilities in cryptographic binary reverse engineering.",
    abstract: "Reverse engineering (RE) is central to software security, particularly for cryptographic programs that handle sensitive data and are highly prone to vulnerabilities. It supports critical tasks such as vulnerability discovery and malware analysis. Despite its importance, RE remains labor-intensive and requires substantial expertise, making large language models (LLMs) a potential solution for automating the process. However, their capabilities for RE remain systematically underexplored. To address this gap, we study the cryptographic binary RE capabilities of LLMs and introduce **CREBench**, a benchmark comprising 432 challenges built from 48 standard cryptographic algorithms, 3 insecure crypto key usage scenarios, and 3 difficulty levels. Each challenge follows a Capture-the-Flag (CTF) RE challenge, requiring the model to analyze the underlying cryptographic logic and recover the correct input. We design an evaluation framework comprising four sub-tasks, from algorithm identification to correct flag recovery. We evaluate eight frontier LLMs on CREBench. GPT-5.4, the best-performing model, achieves 64.03 out of 100 and recovers the flag in 59\% of challenges. We also establish a strong human expert baseline of 92.19 points, showing that humans maintain an advantage in cryptographic RE tasks. Our code and dataset are available at https://github.com/wangyu-ovo/CREBench.",
    links: { paper: "https://arxiv.org/pdf/2604.03750", 
      project: "https://jams-zhou-james.github.io/CREBench/",
      code: { url: "https://github.com/wangyu-ovo/CREBench"} },
  },
  {
    id: "adapaction-2026",
    authors: "Baicheng Chen*, Mingda Zhang*, Min Zhang, Haizhou Li, Baoyuan Wu",
    title: "AdapAction: Adaptive Target Action Backdoor Attack against GUI Agents",
    venue: "CVPR 2026",
    teaserImage: "/image/papers/adapaction-2026.jpg",
    teaserImageAlt: "AdapAction overview figure",
    description: "A novel backdoor attack against LLM-based GUI agents.",
    abstract: "Autonomous Graphical User Interface (GUI) agents powered by Multimodal Large Language Models (MLLMs) are increasingly vital for complex task automation. However, their capacity for self-driven decision-making introduces significant, yet underexplored, security risks, among which backdoor attacks pose a particularly stealthy and high-impact threat. Prior work has shown GUI agents vulnerable to such attacks, but existing methods rely on static trigger-action mappings that execute fixed, context-agnostic behaviors, making them highly detectable. To address this limitation, we introduce **AdapAction**, a novel backdoor attack that subverts the agent’s decision-making by embedding an **adaptive, context-aware policy**. Unlike traditional approaches, AdapAction enables the agent to autonomously select environmentally coherent malicious actions based on the current GUI state and user instruction, thereby evading detection while preserving functional utility. Extensive experiments on the Android-In-The-Zoo (AitZ) and AndroidControl benchmarks show that AdapAction achieves up to 100% Attack Success Rate (ASR) while preserving benign task utility. More critically, AdapAction consistently evades a multi-principle-based LLM defense evaluating instruction alignment, visual coherence, and safety, whereas traditional fixed-action attacks are easily detected. This resilience stems from AdapAction’s contextually grounded malicious actions, which are semantically and visually indistinguishable from legitimate operations. As a result, AdapAction exhibits exceptional stealth and poses a significantly greater real-world threat to LLM-powered GUI agents.",
    links: {
      paper: "https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_AdapAction_Adaptive_Target_Action_Backdoor_Attack_against_GUI_Agents_CVPR_2026_paper.pdf",
      extra: [
        {
          label: "Supplemental",
          url: "https://openaccess.thecvf.com/content/CVPR2026/supplemental/Chen_AdapAction_Adaptive_Target_CVPR_2026_supplemental.pdf",
        },
      ],
      poster: "/image/papers/adapaction-2026-poster.png",
    },
  }
];

const experiences: Experience[] = [
  {
    id: "cuhk-sds",
    logo: "https://baichengdanny.github.io/image/cuhksz.png",
    organization: "The Chinese University of Hong Kong, Shenzhen",
    role: "Undergraduate Student @ School of Data Science",
    advisors: [{ name: "Prof. Baoyuan Wu", url: "https://sites.google.com/site/baoyuanwu2015" }],
    customContent: "GPA: 3.82/4.0",
    dateRange: "2023.09 – Present",
  },
  {
    id: "umd-intern",
    logo: "https://baichengdanny.github.io/image/umd.svg",
    organization: "University of Maryland, College Park",
    role: "Summer Intern @ CS",
    advisors: [{ name: "Prof. Furong Huang", url: "https://furong-huang.com/" }],
    dateRange: "2026.05 – Present",
  },
  {
    id: "tsinghua-iiis",
    logo: "https://baichengdanny.github.io/image/iiis.png",
    organization: "Tsinghua University",
    role: "Research Intern @ IIIS (a.k.a. Yao Class) & Shanghai Qi Zhi Institute",
    advisors: [{ name: "Prof. Tianxing He", url: "https://cloudygoose.github.io/" }, { name: "Prof. Yilei Chen", url: "http://www.chenyilei.net/" }],
    dateRange: "2025.09 – Present",
  },
  {
    id: "uva-intern",
    logo: "https://baichengdanny.github.io/image/uva_logo.svg",
    organization: "University of Virginia",
    role: "Research Intern @ CS",
    advisors: [{ name: "Prof. Tianhao Wang", url: "https://tianhao.wang/" }],
    dateRange: "2025.01 – 2025.09",
  },
  {
    id: "ucb-summer",
    logo: "https://baichengdanny.github.io/image/ucb.jpg",
    organization: "University of California, Berkeley",
    role: "Visiting Student @ EECS",
    customContent: "GPA: 4.0/4.0",
    dateRange: "2024.06 – 2024.08",
  },
];

/* ────────────────────────────────────────────
   Page Component
   ──────────────────────────────────────────── */

export default function Home() {
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set());
  const [profileCardExpanded, setProfileCardExpanded] = useState(false);
  const [enlargedTeaser, setEnlargedTeaser] = useState<{
    src: string;
    alt: string;
    variant?: "default" | "compact";
  } | null>(null);

  const codeUrls = useMemo(
    () =>
      publications
        .map((pub) => pub.links.code?.url)
        .filter((url): url is string => Boolean(url)),
    []
  );
  const githubStars = useGitHubStars(codeUrls);

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

  const renderMarkdownBold = (text: string) => {
    const segments = text.split(/(\*\*[^*]+\*\*)/g);
    return segments.map((seg, i) => {
      const m = /^\*\*([^*]+)\*\*$/.exec(seg);
      if (m) {
        return (
          <strong key={i} className="font-semibold text-gray-900 dark:text-gray-100">
            {m[1]}
          </strong>
        );
      }
      return <span key={i}>{seg}</span>;
    });
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
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">

        {/* ═══════ 1. About (float layout) ═══════ */}
        <h2 className="text-2xl font-bold serif mb-6 dark:text-gray-100 underline decoration-2 underline-offset-8">About</h2>
        <div>
          {/* Photo card — floats right on md+, centered on mobile */}
          <div className="mx-auto mb-6 w-64 sm:w-72 md:float-right md:ml-8 md:mb-4 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 md:p-6 rounded-lg text-center transition-colors">
              <div className="mb-3 md:mb-4">
                <Image
                  src="https://baichengdanny.github.io/image/baicheng.jpg"
                  alt="Baicheng Chen"
                  width={200}
                  height={200}
                  className="rounded-lg mx-auto w-full h-auto"
                />
              </div>
              <div className="text-center fancy">
                <div className="font-bold dark:text-gray-100">Baicheng Chen</div>
                <button
                  type="button"
                  onClick={() => setProfileCardExpanded((prev) => !prev)}
                  aria-expanded={profileCardExpanded}
                  aria-controls="profile-card-details"
                  className="md:hidden mt-2 inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 underline-offset-2 hover:underline"
                >
                  {profileCardExpanded ? "Show less" : "Contact & links"}
                  <svg
                    className={`h-4 w-4 transition-transform ${profileCardExpanded ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id="profile-card-details"
                  className={`space-y-2 mt-2 ${profileCardExpanded ? "block" : "hidden md:block"}`}
                >
                  <div className="dark:text-gray-300">Y4 undergrad, CUHK-Shenzhen</div>
                  <div className="text-sm dark:text-gray-400">baichengchen [at] link [dot] cuhk [dot] edu [dot] cn (preferred)</div>
                  <div className="text-sm dark:text-gray-400">dannybaicheng [at] gmail [dot] com</div>
                  <div className="flex flex-col items-center gap-2 text-sm pt-1">
                    <div className="flex justify-center space-x-2">
                      <a href="https://github.com/BaichengDanny" className={inlineLinkClass}>GitHub</a>
                      <span>|</span>
                      <a href="https://scholar.google.com/citations?hl=en&user=qWXaUi0AAAAJ" className={inlineLinkClass}>Google Scholar</a>
                      <span>|</span>
                      <a href="https://x.com/dannychen1223" className={inlineLinkClass}>X</a>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <a href="https://www.linkedin.com/in/baicheng-danny-chen/" className={inlineLinkClass}>LinkedIn</a>
                      <span>|</span>
                      <button
                        type="button"
                        onClick={() =>
                          setEnlargedTeaser({ src: "/image/wechat.jpg", alt: "WeChat QR code", variant: "compact" })
                        }
                        className={`${inlineLinkClass} bg-transparent border-0 p-0 cursor-pointer text-sm`}
                      >
                        WeChat
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Intro text — wraps around the floated photo */}
          <div className="prose prose-lg max-w-none fancy">
            <p className="text-lg leading-relaxed dark:text-gray-300">
              Hi!
              I am Baicheng (Danny) Chen, a senior undergraduate student majoring in Computer Science and Engineering (CSE) at the <a href="https://www.cuhk.edu.cn" className={inlineLinkClass}>Chinese University of Hong Kong, Shenzhen</a>.
            </p>
            <br />
            <p className="text-lg leading-relaxed dark:text-gray-300">
              My <a href="#research-interests" className={inlineLinkClass}>research interests</a> lie in the intersection of Trustworthy AI and Computer Security, focusing on the dual challenge of ensuring AI security while leveraging it for specialized security applications.
              Currently, I am working on Agentic AI security and the application of agent in cryptography.
            </p>
            <br />
            <p className="text-lg leading-relaxed dark:text-gray-300">
              I am fortunate to be advised by <a href="https://sites.google.com/site/baoyuanwu2015/" className={blueLinkClass}>Prof. Baoyuan Wu</a> at CUHK-Shenzhen.
              And I am also grateful to collaborate with <a href="https://furong-huang.com/" className={blueLinkClass}>Prof. Furong Huang</a> (UMD), <a href="https://cloudygoose.github.io/" className={blueLinkClass}>Prof. Tianxing He</a> (IIIS, THU) and <a href="https://tianhao.wang/" className={blueLinkClass}>Prof. Tianhao Wang</a> (UVA) along my research journey.
            </p>
            <br />
            <p className="text-lg leading-relaxed dark:text-gray-300">
              <b>Currently, I am actively seeking for <span className="text-red-600">PhD positions (2027 Fall)</span> and <span className="text-red-600">internship opportunities</span> in the field of Trustworthy AI.</b> If you are interested in my research and would like to chat with me further, please <a href="mailto:baichengchen@link.cuhk.edu.cn" className={inlineLinkClass}>email me</a>.
            </p>
            <p className="text-lg leading-relaxed dark:text-gray-300">I am also open to any kind of collaborations and discussions, please feel free to reach out to me.</p>
          </div>

          {/* ═══════ 2. News (wraps around photo too) ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-6 dark:text-gray-100 underline decoration-2 underline-offset-8">🔥 News</h2>
            <div className="max-h-52 overflow-y-auto pr-2">
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

          {/* ═══════ 3. Research Interests ═══════ */}
          <div id="research-interests" className="mt-10 fancy scroll-mt-8">
            <h2 className="text-2xl font-bold serif mb-6 dark:text-gray-100 underline decoration-2 underline-offset-8">
              Research Interests
            </h2>
            <p className="text-lg leading-relaxed dark:text-gray-300 mb-4">
              My research goal is to build AI systems that remain secure as they become increasingly autonomous
              in real world environments. I work at the intersection of{" "}
              <strong>AI and Security</strong>, studying how agentic deployment changes existing security assumptions,
              how to build safeguards that remain effective in practice, and how increasingly capable AI systems
              reshape both security risks and capabilities.
            </p>
            <p className="text-lg leading-relaxed dark:text-gray-300 mb-4">My recent research topics include:</p>
            <ul className="list-disc space-y-3 pl-6 text-lg leading-relaxed dark:text-gray-300">
              <li>
                <strong>Security gaps in modern agentic AI deployments:</strong>{" "}
                [
                <a
                  href="https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_AdapAction_Adaptive_Target_Action_Backdoor_Attack_against_GUI_Agents_CVPR_2026_paper.pdf"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  AdapAction
                </a>
                ]{" "}
                [
                <a
                  href="https://arxiv.org/pdf/2608.21544"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ATU
                </a>
                ]
              </li>
              <li>
                <strong>Scalable safeguards and accountability mechanisms for AI systems:</strong>{" "}
                [
                <a
                  href="https://arxiv.org/pdf/2402.13126"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VGMShield
                </a>
                ]{" "}
                [
                <a
                  href="https://arxiv.org/pdf/2608.21544"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ATU
                </a>
                ]
              </li>
              <li>
                <strong>AI&apos;s broader security and societal impact:</strong>{" "}
                [
                <a
                  href="https://jams-zhou-james.github.io/CREBench/"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CREBench
                </a>
                ]{" "}
                [
                <a
                  href="https://arxiv.org/pdf/2601.13981"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VirtualCrime
                </a>
                ]
              </li>
            </ul>
          </div>

          {/* ═══════ 4. Selected Publications ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-2 dark:text-gray-100 underline decoration-2 underline-offset-8">Selected Publications</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-4 mb-1">
              Only some of my papers are listed. See more on the{" "}
              <Link href="/papers" className={inlineLinkClass}>Papers</Link>{" "}
              page or{" "}
              <a href="https://scholar.google.com/citations?hl=en&user=qWXaUi0AAAAJ" className={inlineLinkClass}>Google Scholar</a>.
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mb-8">(* indicates equal contribution)</p>

            <div className="space-y-10">
            {publications.map((pub) => (
              <div key={pub.id} className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="flex-1 min-w-0">
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
                    <CodeLinkBadge
                      href={pub.links.code.url}
                      stars={pub.links.code.stars ?? githubStars[pub.links.code.url]}
                    />
                  )}
                  {pub.links.project && (
                    <a
                      href={pub.links.project}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      Project Page
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
                  {pub.links.extra?.map((link) => (
                    <a
                      key={`${pub.id}-${link.label}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                  {pub.links.poster && (
                    <button
                      type="button"
                      onClick={() =>
                        setEnlargedTeaser({
                          src: pub.links.poster!,
                          alt: `${pub.title} poster`,
                        })
                      }
                      className="inline-block px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
                    >
                      Poster
                    </button>
                  )}
                </div>

                {/* Expanded abstract */}
                {expandedAbstracts.has(pub.id) && pub.abstract && (
                  <div className="mt-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm leading-relaxed text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                    {renderMarkdownBold(pub.abstract)}
                  </div>
                )}
                </div>

                {pub.teaserImage && (
                  <div className="shrink-0 w-full sm:w-56 md:w-64 lg:w-72">
                    <button
                      type="button"
                      onClick={() =>
                        setEnlargedTeaser({
                          src: pub.teaserImage!,
                          alt: pub.teaserImageAlt ?? `${pub.title} teaser figure`,
                        })
                      }
                      className="block w-full cursor-zoom-in rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      aria-label={`Enlarge figure for ${pub.title}`}
                    >
                      <Image
                        src={pub.teaserImage}
                        alt={pub.teaserImageAlt ?? `${pub.title} teaser figure`}
                        width={288}
                        height={216}
                        className="w-full h-auto rounded-md border border-gray-200 dark:border-gray-700 shadow-sm transition-transform hover:scale-[1.02]"
                      />
                    </button>
                  </div>
                )}
              </div>
            ))}
            </div>
          </div>

          {/* ═══════ 5. Experiences ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-8 dark:text-gray-100 underline decoration-2 underline-offset-8">Experiences</h2>

            <div className="space-y-8">
              {experiences.map((exp) => (
                <div key={exp.id} className="flex items-start gap-5">
                  {/* Logo */}
                  <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center">
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
                                  className={blueLinkClass}
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

          {/* ═══════ 6. Services ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-4 dark:text-gray-100 underline decoration-2 underline-offset-8">
              Services
            </h2>
            <ul className="list-disc space-y-1 pl-6 text-lg leading-relaxed text-gray-900 dark:text-gray-100">
              <li>Reviewer: COLM 2026, AAAI 2027, ARR August 2026</li>
              <li>
                <a
                  href="https://mp.weixin.qq.com/s/ZLxwiBmkNFybyzaOxEeudg"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Peer Advisor
                </a>
                , School of Data Science, CUHK-Shenzhen (2024 – 2025, 2025 – 2026, 2026 – 2027)
              </li>
         
            </ul>
          </div>

          {/* ═══════ 7. Miscellaneous ═══════ */}
          <div className="mt-10 fancy">
            <h2 className="text-2xl font-bold serif mb-4 dark:text-gray-100 underline decoration-2 underline-offset-8">
              Miscellaneous
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-lg leading-relaxed dark:text-gray-300">
              <li>
                I am passionate about video editing and color grading 🎬. Selected work is available on Bilibili channels of{" "}
                <a
                  href="https://space.bilibili.com/668422989"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Qingjiu TV Station
                </a>{" "}
                and the{" "}
                <a
                  href="https://space.bilibili.com/508002687"
                  className={inlineLinkClass}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  CUHK-Shenzhen Student Union
                </a>
                .
              </li>
            </ul>
          </div>

          {/* Clear float */}
          <div className="clear-both"></div>
        </div>
      </div>

      <Footer />

      {enlargedTeaser && (
        <EnlargedImageModal
          src={enlargedTeaser.src}
          alt={enlargedTeaser.alt}
          variant={enlargedTeaser.variant}
          onClose={() => setEnlargedTeaser(null)}
        />
      )}
    </div>
  );
}
