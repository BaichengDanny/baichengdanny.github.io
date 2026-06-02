'use client';

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ThemeToggle } from "../../components/ThemeToggle";
import Footer from "../../components/Footer";
import { CV_URL } from "../../lib/constants";
import { cn } from "../../lib/utils";

function isFirstOrCoFirstBaicheng(authors: string): boolean {
  const first = authors.split(",")[0]?.trim() ?? "";
  if (/^Baicheng Chen\s*\*?$/.test(first)) return true;
  return /Baicheng Chen\s*\*/.test(authors);
}

interface Paper {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  description: string;
  abstract?: string;
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
    id: "vgmshield-2024",
    title: "VGMShield: Mitigating Misuse of Video Generative Models",
    authors: "Yan Pang, Baicheng Chen, Yang Zhang, Tianhao Wang",
    venue: "arXiv preprint",
    year: 2024,
    description: "",
    abstract: "With the rapid advancement in video generation, people can conveniently use video generation models to create videos tailored to their specific desires. As a result, there are also growing concerns about the potential misuse of video generation for spreading illegal content and misinformation. In this work, we introduce VGMShield: a set of straightforward but effective mitigations through the lifecycle of fake video generation. We start from fake video detection, trying to understand whether there is uniqueness in generated videos and whether we can differentiate them from real videos; then, we investigate the fake video source tracing problem, which maps a fake video back to the model that generated it. Towards these, we propose to leverage pre-trained models that focus on spatial-temporal dynamics as the backbone to identify inconsistencies in videos. In detail, we analyze fake videos from the perspective of the generation process. Based on the observation of attention shifts, motion variations, and frequency fluctuations, we identify common patterns in the generated video. These patterns serve as the foundation for our experiments on fake video detection and source tracing. Through experiments on seven state-of-the-art open-source models, we demonstrate that current models still cannot reliably reproduce spatial-temporal relationships, and thus, we can accomplish detection and source tracing with over 90% accuracy. Furthermore, anticipating future generative model improvements, we propose a prevention method that adds invisible perturbations to the query images to make the generated videos look unreal. Together with detection and tracing, our multi-faceted set of solutions can effectively mitigate misuse of video generative models.",
    links: { pdf: "https://arxiv.org/pdf/2402.13126", code: "https://github.com/py85252876/MMVGM" },
    awards: []
  },
  {
    id: "fl-brain-2024",
    title: "Federated Learning-Based EfficientNet in Brain Tumor Classification",
    authors: "Baicheng Chen",
    venue: "EMITI",
    year: 2024,
    description: "",
    abstract: "The trend of implementing Machine Learning algorithms in the medical diagnosis field is necessary and meaningful. However, data privacy has become a big problem in applications. This paper uses the Federated Learning (FL) architecture to deal with the privacy problem and finds ways to improve the model’s performance. The study combines the FedAvg FL Algorithm and the CNN model EfficientNet to train them on the Brain Tumor Classification (MRI) dataset. Before implementing the algorithm, the study did some preprocessing on the data. Then, the study used EfficientNet to further process and recognize the images and FedAvg to weighted average the models trained by clients. Moreover, the study explored the optimizers and loss functions, choosing the AdamW and Cross-entropy loss which fitted this task better. Finally, the study went deep into parameter tuning work, drawing some curves and tables to visualize the results. After parameter tuning, this paper found a nice testing accuracy of 81.218% and a high training accuracy of almost 99% averaged by all the clients. Also, the paper discusses the conditions for implementing different CNN models and analyses their pros and cons in the medical diagnosis field, providing some ideas for the combination of network models and algorithms.",
    links: { pdf: "https://www.scitepress.org/Papers/2024/129509/129509.pdf", code: "#" },
    awards: []
  },
  {
    id: "deepfakebench-mm-2025",
    title: "DeepfakeBench-MM: A Comprehensive Benchmark for Multimodal Deepfake Detection",
    authors: "Kangran Zhao*, Yupeng Chen*, Xiaoyu Zhang*, Yize Chen, Weinan Guan, Baicheng Chen, Chengzhe Sun, Soumyya Kanti Datta, Qingshan Liu, Siwei Lyu, Baoyuan Wu",
    venue: "arXiv preprint",
    year: 2025,
    description: "",
    abstract: "The misuse of advanced generative AI models has resulted in the widespread proliferation of falsified data, particularly forged human-centric audiovisual content, which poses substantial societal risks (e.g., financial fraud and social instability). In response to this growing threat, several works have preliminarily explored countermeasures. However, the lack of sufficient and diverse training data, along with the absence of a standardized benchmark, hinder deeper exploration. To address this challenge, we first build **Mega-MMDF**, a large-scale, diverse, and high-quality dataset for multimodal deepfake detection. Specifically, we employ 21 forgery pipelines through the combination of 10 audio forgery methods, 12 visual forgery methods, and 6 audio-driven face reenactment methods. Mega-MMDF currently contains 0.1 million real samples and 1.1 million forged samples, making it one of the largest and most diverse multimodal deepfake datasets, with plans for continuous expansion. Building on it, we present **DeepfakeBench-MM**, the first unified benchmark for multimodal deepfake detection. It establishes standardized protocols across the entire detection pipeline and serves as a versatile platform for evaluating existing methods as well as exploring novel approaches. DeepfakeBench-MM currently supports 5 datasets and 11 multimodal deepfake detectors. Furthermore, our comprehensive evaluations and in-depth analyses uncover several key findings from multiple perspectives (e.g., augmentation, stacked forgery). We believe that DeepfakeBench-MM, together with our large-scale Mega-MMDF, will serve as foundational infrastructures for advancing multimodal deepfake detection.",
    links: { pdf: "https://arxiv.org/pdf/2510.22622", code: "#" },
    awards: []
  },
  {
    id: "crebench-2026",
    title: "CREBench: Evaluating Large Language Models in Cryptographic Binary Reverse Engineering",
    authors: "Baicheng Chen*, Yu Wang*, Ziheng Zhou*, Xiangru Liu, Juanru Li, Yilei Chen, Tianxing He",
    venue: "arXiv preprint",
    year: 2026,
    description: "",
    abstract: "Reverse engineering (RE) is central to software security, particularly for cryptographic programs that handle sensitive data and are highly prone to vulnerabilities. It supports critical tasks such as vulnerability discovery and malware analysis. Despite its importance, RE remains labor-intensive and requires substantial expertise, making large language models (LLMs) a potential solution for automating the process. However, their capabilities for RE remain systematically underexplored. To address this gap, we study the cryptographic binary RE capabilities of LLMs and introduce **CREBench**, a benchmark comprising 432 challenges built from 48 standard cryptographic algorithms, 3 insecure crypto key usage scenarios, and 3 difficulty levels. Each challenge follows a Capture-the-Flag (CTF) RE challenge, requiring the model to analyze the underlying cryptographic logic and recover the correct input. We design an evaluation framework comprising four sub-tasks, from algorithm identification to correct flag recovery. We evaluate eight frontier LLMs on CREBench. GPT-5.4, the best-performing model, achieves 64.03 out of 100 and recovers the flag in 59\% of challenges. We also establish a strong human expert baseline of 92.19 points, showing that humans maintain an advantage in cryptographic RE tasks. Our code and dataset are available at https://github.com/wangyu-ovo/CREBench.",
    links: { pdf: "https://arxiv.org/pdf/2604.03750", code: "https://github.com/wangyu-ovo/CREBench" },
    awards: []
  },
  {
    id: "virtualcrime-2026",
    title: "VirtualCrime: Evaluating Criminal Potential of Large Language Models via Sandbox Simulation",
    authors: "Yilin Tang*, Yu Wang*, Lanlan Qiu, Wenchang Gao, Yunfei Ma, Baicheng Chen, Tianxing He",
    venue: "arXiv preprint",
    year: 2026,
    description: "",
    abstract: "Large language models (LLMs) have shown strong capabilities in multi-step decision-making, planning and actions, and are increasingly integrated into various real-world applications. It is concerning whether their strong problem-solving abilities may be misused for crimes. To address this gap, we propose VirtualCrime, a sandbox simulation framework based on a three-agent system to evaluate the criminal capabilities of models. Specifically, this framework consists of an attacker agent acting as the leader of a criminal team, a judge agent determining the outcome of each action, and a world manager agent updating the environment state and entities. Furthermore, we design 40 diverse crime tasks within this framework, covering 11 maps and 13 crime objectives such as theft, robbery, kidnapping, and riot. We also introduce a human player baseline for reference to better interpret the performance of LLM agents. We evaluate 8 strong LLMs and find (1) All agents in the simulation environment compliantly generate detailed plans and execute intelligent crime processes, with some achieving relatively high success rates; (2) In some cases, agents take severe action that inflicts harm to NPCs to achieve their goals. Our work highlights the need for safety alignment when deploying agentic AI in real-world settings.",
    links: { pdf: "https://arxiv.org/pdf/2601.13981", code: "#" },
    awards: []
  },
  {
    id: "adapaction-2026",
    title: "AdapAction: Adaptive Target Action Backdoor Attack against GUI Agents",
    authors: "Baicheng Chen*, Mingda Zhang*, Min Zhang, Haizhou Li, Baoyuan Wu",
    venue: "CVPR",
    year: 2026,
    description: "A novel backdoor attack against LLM-based GUI agents",
    abstract:
      "Autonomous Graphical User Interface (GUI) agents powered by Multimodal Large Language Models (MLLMs) are increasingly vital for complex task automation. However, their capacity for self-driven decision-making introduces significant, yet underexplored, security risks, among which backdoor attacks pose a particularly stealthy and high-impact threat. Prior work has shown GUI agents vulnerable to such attacks, but existing methods rely on static trigger-action mappings that execute fixed, context-agnostic behaviors, making them highly detectable. To address this limitation, we introduce **AdapAction**, a novel backdoor attack that subverts the agent’s decision-making by embedding an **adaptive, context-aware policy**. Unlike traditional approaches, AdapAction enables the agent to autonomously select environmentally coherent malicious actions based on the current GUI state and user instruction, thereby evading detection while preserving functional utility. Extensive experiments on the Android-In-The-Zoo (AitZ) and AndroidControl benchmarks show that AdapAction achieves up to 100% Attack Success Rate (ASR) while preserving benign task utility. More critically, AdapAction consistently evades a multi-principle-based LLM defense evaluating instruction alignment, visual coherence, and safety, whereas traditional fixed-action attacks are easily detected. This resilience stems from AdapAction’s contextually grounded malicious actions, which are semantically and visually indistinguishable from legitimate operations. As a result, AdapAction exhibits exceptional stealth and poses a significantly greater real-world threat to LLM-powered GUI agents.",
    links: { pdf: "https://openaccess.thecvf.com/content/CVPR2026/papers/Chen_AdapAction_Adaptive_Target_Action_Backdoor_Attack_against_GUI_Agents_CVPR_2026_paper.pdf", code: "#" },
    awards: []
  },
];

function renderMarkdownBold(text: string) {
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
}

export default function PapersPage() {
  const [selectedVenue, setSelectedVenue] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [abstractPaperId, setAbstractPaperId] = useState<string | null>(null);

  const abstractPaper = abstractPaperId
    ? papersData.find((p) => p.id === abstractPaperId)
    : null;

  useEffect(() => {
    if (!abstractPaperId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAbstractPaperId(null);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [abstractPaperId]);

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
            <h1 className="text-xl md:text-2xl serif dark:text-gray-100 font-bold">Papers</h1>
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
                <Link href="/talks" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">Talks</Link>
                <Link href={CV_URL} className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100 fancy">CV</Link>
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
                <h1 className="text-lg font-bold serif mb-4">Full List of Papers (* indicates equal contribution):</h1>
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
                        <div
                          key={paper.id}
                          className={cn(
                            "pl-4 rounded-r-lg py-2 pr-2 -ml-0.5 transition-colors",
                            isFirstOrCoFirstBaicheng(paper.authors)
                              ? "border-l-4 border-yellow-400 bg-yellow-50/90 shadow-sm ring-1 ring-yellow-200/80 dark:bg-yellow-950/40 dark:border-yellow-500 dark:ring-yellow-700/50"
                              : "border-l-2 border-gray-100 dark:border-gray-700"
                          )}
                        >
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
                            {paper.abstract && (
                              <button
                                type="button"
                                onClick={() => setAbstractPaperId(paper.id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm underline-offset-2 hover:underline"
                              >
                                Abstract
                              </button>
                            )}
                            {paper.links.pdf && (
                              <>
                                {paper.abstract && <span className="text-gray-400">|</span>}
                                <a href={paper.links.pdf} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">PDF</a>
                              </>
                            )}
                            {paper.links.code && (
                              <>
                                {(paper.abstract || paper.links.pdf) && <span className="text-gray-400">|</span>}
                                <a href={paper.links.code} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 text-sm">Code</a>
                              </>
                            )}
                            {paper.links.demo && (
                              <>
                                {(paper.abstract || paper.links.pdf || paper.links.code) && (
                                  <span className="text-gray-400">|</span>
                                )}
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

      {/* Abstract modal */}
      {abstractPaper && abstractPaper.abstract && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="paper-abstract-title"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/50 dark:bg-black/60"
            aria-label="Close abstract"
            onClick={() => setAbstractPaperId(null)}
          />
          <div className="relative w-full max-w-2xl max-h-[min(85vh,720px)] flex flex-col rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 shadow-xl overflow-hidden">
            <div className="flex items-start justify-between gap-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/80 px-4 py-3 shrink-0">
              <h2 id="paper-abstract-title" className="text-base font-semibold serif text-gray-900 dark:text-gray-100 pr-2">
                {abstractPaper.title}
              </h2>
              <button
                type="button"
                onClick={() => setAbstractPaperId(null)}
                className="shrink-0 rounded-md p-1 text-gray-500 hover:bg-gray-200/80 dark:hover:bg-gray-700 dark:text-gray-400"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto px-4 py-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {renderMarkdownBold(abstractPaper.abstract)}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
