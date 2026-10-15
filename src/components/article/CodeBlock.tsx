import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import CopyButton from './CopyButton';

interface CodeBlockProps {
  code: string;
  language?: string;
}

// Fence names that Prism doesn't recognize directly.
const PRISM_ALIASES: Record<string, string> = {
  'c++': 'cpp',
  shellsession: 'shell-session',
  console: 'shell-session',
  sh: 'bash',
  shell: 'bash',
  zsh: 'bash',
  py: 'python',
  js: 'javascript',
  ts: 'typescript',
};

// Token colors live in globals.css (`.code-block`) so light and dark themes
// can switch with the site theme without client-side highlighting.
export default function CodeBlock({ code, language }: CodeBlockProps) {
  const prismLanguage = language ? (PRISM_ALIASES[language.toLowerCase()] ?? language.toLowerCase()) : 'text';

  return (
    <div className="code-block not-article-prose my-4 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-3 py-1 dark:border-gray-700 dark:bg-gray-800">
        <span className="font-mono text-xs text-gray-500 dark:text-gray-400">{language || 'text'}</span>
        <CopyButton text={code} />
      </div>
      <SyntaxHighlighter
        language={prismLanguage}
        useInlineStyles={false}
        style={{}}
        codeTagProps={{ className: `language-${prismLanguage}` }}
        PreTag="pre"
        className="overflow-x-auto p-4 text-xs md:text-sm leading-relaxed"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
