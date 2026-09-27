interface CodeLinkBadgeProps {
  href: string;
  stars?: number;
}

export function CodeLinkBadge({ href, stars }: CodeLinkBadgeProps) {
  const showStars = stars !== undefined && stars > 0;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
    >
      <span>Code</span>
      {showStars && (
        <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
          (⭐ {stars.toLocaleString()})
        </span>
      )}
    </a>
  );
}
