import { GitHubRepo } from "@/types/github";

type ScoreInput = {
  repos: GitHubRepo[];
  followers: number;
  totalStars: number;
  languageCount: number;
};

export function calculatePortfolioScore({
  repos,
  followers,
  totalStars,
  languageCount,
}: ScoreInput): number {
  let score = 0;

  const repoCount = repos.length;
  const reposWithDescription = repos.filter((repo) => !!repo.description).length;
  const reposWithHomepage = repos.filter((repo) => !!repo.homepage).length;

  score += Math.min(repoCount * 5, 30);
  score += Math.min(followers * 2, 20);
  score += Math.min(totalStars * 2, 20);
  score += Math.min(languageCount * 4, 12);
  score += Math.min(reposWithDescription * 2, 10);
  score += Math.min(reposWithHomepage * 2, 8);

  return Math.min(score, 100);
}

export function generateSuggestions(repos: GitHubRepo[]): string[] {
  const suggestions: string[] = [];

  const repoCount = repos.length;
  const reposWithDescription = repos.filter((repo) => !!repo.description).length;
  const reposWithHomepage = repos.filter((repo) => !!repo.homepage).length;
  const readmeProxyLowQuality = repos.filter(
    (repo) => !repo.description || repo.description.trim().length < 10
  ).length;

  if (repoCount < 5) {
    suggestions.push("Add more public projects to make your portfolio look stronger.");
  }

  if (reposWithDescription < repoCount) {
    suggestions.push("Improve repository descriptions so visitors quickly understand each project.");
  }

  if (reposWithHomepage < Math.min(2, repoCount)) {
    suggestions.push("Add live demo links or project homepages to showcase working builds.");
  }

  if (readmeProxyLowQuality > 0) {
    suggestions.push("Enhance documentation and README quality for clearer project presentation.");
  }

  const languageSet = new Set(repos.map((repo) => repo.language).filter(Boolean));
  if (languageSet.size < 2 && repoCount > 0) {
    suggestions.push("Showcase variety by building projects with at least one or two different technologies.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Your portfolio looks solid. Keep shipping polished projects and improving documentation.");
  }

  return suggestions;
}
