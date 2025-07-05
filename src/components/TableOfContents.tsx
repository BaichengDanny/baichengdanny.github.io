'use client';

import { useEffect, useState } from 'react';

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    // Extract headings from markdown content
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const items: TocItem[] = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const title = match[2].trim();
      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

      items.push({ id, title, level });
    }

    setTocItems(items);
  }, [content]);

  useEffect(() => {
    // Observer for active heading
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0% -80% 0%',
        threshold: 0
      }
    );

    // Observe all headings
    const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, []);

  if (tocItems.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="sticky top-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4 max-h-96 overflow-y-auto">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
        Table of Contents
      </h3>
      <nav className="space-y-1">
        {tocItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToHeading(item.id)}
            className={`
              block w-full text-left text-sm transition-colors hover:text-red-600 dark:hover:text-red-400
              ${item.level === 1 ? 'font-medium' : ''}
              ${item.level === 2 ? 'pl-3' : ''}
              ${item.level === 3 ? 'pl-6' : ''}
              ${item.level === 4 ? 'pl-9' : ''}
              ${item.level === 5 ? 'pl-12' : ''}
              ${item.level === 6 ? 'pl-15' : ''}
              ${
                activeId === item.id
                  ? 'text-red-600 dark:text-red-400 font-medium'
                  : 'text-gray-600 dark:text-gray-400'
              }
            `}
          >
            {item.title}
          </button>
        ))}
      </nav>
    </div>
  );
}
