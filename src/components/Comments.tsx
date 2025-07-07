'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface CommentsProps {
  articleId: string;
}

export default function Comments({ articleId }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [showSetup, setShowSetup] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    ref.current.innerHTML = '';

    const scriptElem = document.createElement('script');
    scriptElem.src = 'https://giscus.app/client.js';
    scriptElem.async = true;
    scriptElem.crossOrigin = 'anonymous';

    scriptElem.setAttribute('data-repo', 'BaichengDanny/baichengdanny.github.io');
    scriptElem.setAttribute('data-repo-id', 'R_kgDOPHKpWA');
    scriptElem.setAttribute('data-category', 'General');
    scriptElem.setAttribute('data-category-id', 'DIC_kwDOPHKpWM4CsjSY');
    scriptElem.setAttribute('data-mapping', 'specific');
    scriptElem.setAttribute('data-term', `article-${articleId}`);
    scriptElem.setAttribute('data-strict', '0');
    scriptElem.setAttribute('data-reactions-enabled', '1');
    scriptElem.setAttribute('data-emit-metadata', '0');
    scriptElem.setAttribute('data-input-position', 'bottom');
    scriptElem.setAttribute('data-theme', theme === 'dark' ? 'dark' : 'light');
    scriptElem.setAttribute('data-lang', 'zh-CN');
    scriptElem.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(scriptElem);
  }, [articleId, theme]);

  // Update theme when it changes
  useEffect(() => {
    const iframe = ref.current?.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
    if (!iframe) return;

    const message = {
      setConfig: {
        theme: theme === 'dark' ? 'dark' : 'light'
      }
    };
    iframe.contentWindow?.postMessage({ giscus: message }, 'https://giscus.app');
  }, [theme]);

  return (
    <div className="mt-12 pt-8">
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-bold serif dark:text-gray-100 mb-2">Discussions</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Based on GitHub Discussions system, need your GitHub account to log in.
        </p>
      </div>
      <div ref={ref} />
    </div>
  );
}
