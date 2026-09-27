import { Star } from "lucide-react";
import { type ReactNode } from "react";
import { useGitHubStars } from "../hooks/useGitHubStars";

interface GitHubInlineLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

export function GitHubInlineLink({ href, className, children }: GitHubInlineLinkProps) {
  const starsByUrl = useGitHubStars([href]);
  const stars = starsByUrl[href];
  const showStars = stars !== undefined && stars > 0;

  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      {showStars && (
        <span className="inline-flex items-center gap-0.5 ml-1 tabular-nums underline-offset-2">
          <Star className="size-3 fill-amber-400 text-amber-400" aria-hidden />
          {stars.toLocaleString()}
        </span>
      )}
    </a>
  );
}
