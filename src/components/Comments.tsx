'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface CommentsProps {
  articleId: string;
  /** giscus UI language, e.g. "en" or "zh-CN" */
  lang?: string;
}

export default function Comments({ articleId, lang = 'en' }: CommentsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const giscusTheme = resolvedTheme === 'dark' ? 'dark' : 'light';
  const themeRef = useRef(giscusTheme);
  themeRef.current = giscusTheme;
  const themeReady = resolvedTheme !== undefined;

  // Inject giscus once per article; theme changes are sent via postMessage below.
  useEffect(() => {
    if (!ref.current || !themeReady) return;

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
    scriptElem.setAttribute('data-theme', themeRef.current);
    scriptElem.setAttribute('data-lang', lang);
    scriptElem.setAttribute('data-loading', 'lazy');

    ref.current.appendChild(scriptElem);
  }, [articleId, lang, themeReady]);

  useEffect(() => {
    const iframe = ref.current?.querySelector<HTMLIFrameElement>('iframe.giscus-frame');
    iframe?.contentWindow?.postMessage({ giscus: { setConfig: { theme: giscusTheme } } }, 'https://giscus.app');
  }, [giscusTheme]);

  return (
    <div className="mt-12 pt-8">
      <div className="mb-6">
        <h2 className="text-lg md:text-xl font-bold serif dark:text-gray-100 mb-2">Discussions</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Based on GitHub Discussions system, need your GitHub account to log in.
        </p>
      </div>
      <div ref={ref} />
    </div>
  );
}
