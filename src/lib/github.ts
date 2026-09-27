export function parseGitHubRepoUrl(url: string): string | null {
  try {
    const { hostname, pathname } = new URL(url);
    if (hostname !== "github.com" && hostname !== "www.github.com") return null;

    const [owner, repo] = pathname.split("/").filter(Boolean);
    if (!owner || !repo) return null;

    return `${owner}/${repo.replace(/\.git$/, "")}`;
  } catch {
    return null;
  }
}
