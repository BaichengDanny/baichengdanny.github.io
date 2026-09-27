import { useEffect, useState } from "react";
import { parseGitHubRepoUrl } from "../lib/github";

export function useGitHubStars(codeUrls: string[]): Record<string, number> {
  const [starsByUrl, setStarsByUrl] = useState<Record<string, number>>({});

  useEffect(() => {
    const uniqueRepos = [
      ...new Set(codeUrls.map(parseGitHubRepoUrl).filter((repo): repo is string => repo !== null)),
    ];
    if (uniqueRepos.length === 0) return;

    let cancelled = false;

    Promise.all(
      uniqueRepos.map(async (repo) => {
        try {
          const response = await fetch(`https://api.github.com/repos/${repo}`, {
            headers: { Accept: "application/vnd.github+json" },
          });
          if (!response.ok) return { repo, stars: null as number | null };

          const data = (await response.json()) as { stargazers_count?: number };
          return { repo, stars: data.stargazers_count ?? null };
        } catch {
          return { repo, stars: null as number | null };
        }
      })
    ).then((results) => {
      if (cancelled) return;

      const starsByRepo = Object.fromEntries(
        results
          .filter((result): result is { repo: string; stars: number } => result.stars !== null)
          .map((result) => [result.repo, result.stars])
      );

      const nextStarsByUrl: Record<string, number> = {};
      for (const url of codeUrls) {
        const repo = parseGitHubRepoUrl(url);
        if (repo && starsByRepo[repo] !== undefined) {
          nextStarsByUrl[url] = starsByRepo[repo];
        }
      }

      setStarsByUrl(nextStarsByUrl);
    });

    return () => {
      cancelled = true;
    };
  }, [codeUrls]);

  return starsByUrl;
}
