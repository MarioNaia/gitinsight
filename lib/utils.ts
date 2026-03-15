import { GitHubRepo, LanguageStat } from "@/types/github";

export function formatNumber(value: number): string {
  return new Intl.NumberFormat().format(value);
}

export function getLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const languageMap = new Map<string, number>();

  repos.forEach((repo) => {
    if (!repo.language) return;
    languageMap.set(repo.language, (languageMap.get(repo.language) || 0) + 1);
  });

  return Array.from(languageMap.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

export function getTotalStars(repos: GitHubRepo[]): number {
  return repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
}

export function getMostStarredRepo(repos: GitHubRepo[]): GitHubRepo | null {
  if (!repos.length) return null;

  return [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0] ?? null;
}

export function getNonForkRepos(repos: GitHubRepo[]): GitHubRepo[] {
  return repos.filter((repo) => !repo.fork);
}
