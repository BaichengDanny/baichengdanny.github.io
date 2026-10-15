'use client';

import { useEffect, useState, type MouseEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import type { TocItem } from '../lib/articles';

interface TableOfContentsProps {
  items: TocItem[];
  /** "sidebar" is the sticky desktop panel; "inline" is a collapsible block for small screens. */
  variant?: 'sidebar' | 'inline';
}

const indentClass: Record<number, string> = {
  1: 'pl-3 font-medium',
  2: 'pl-3',
  3: 'pl-6',
  4: 'pl-9',
};

export function TableOfContents({ items, variant = 'sidebar' }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (variant !== 'sidebar' || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: '-20% 0% -80% 0%', threshold: 0 }
    );

    for (const item of items) {
      const heading = document.getElementById(item.id);
      if (heading) observer.observe(heading);
    }

    return () => observer.disconnect();
  }, [items, variant]);

  if (items.length === 0) return null;

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    event.preventDefault();
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
    setActiveId(id);
  };

  const links = (
    <nav className="border-l border-gray-200 dark:border-gray-700">
      {items.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={(event) => handleClick(event, item.id)}
          aria-current={activeId === item.id ? 'location' : undefined}
          className={`-ml-px block border-l-2 py-1 pr-1 text-sm transition-colors hover:text-red-600 dark:hover:text-red-400 ${indentClass[item.level] ?? 'pl-3'} ${
            activeId === item.id
              ? 'border-red-600 text-red-600 dark:border-red-400 dark:text-red-400 font-medium'
              : 'border-transparent text-gray-600 dark:text-gray-400'
          }`}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );

  if (variant === 'inline') {
    return (
      <details className="group mb-6 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-gray-900 dark:text-gray-100 [&::-webkit-details-marker]:hidden">
          Table of Contents
          <ChevronDown aria-hidden="true" className="h-4 w-4 text-gray-500 transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3 max-h-80 overflow-y-auto">{links}</div>
      </details>
    );
  }

  return (
    <div className="sticky top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-[calc(100vh-2rem)] overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">Table of Contents</h3>
      {links}
    </div>
  );
}
