export type GitHubUser = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
};

export type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  homepage: string | null;
};

export type LanguageStat = {
  name: string;
  value: number;
};

export type AnalyzedGitHubData = {
  user: GitHubUser;
  stats: {
    totalRepos: number;
    totalStars: number;
    topLanguages: LanguageStat[];
    mostStarredRepo: GitHubRepo | null;
    portfolioScore: number;
  };
  suggestions: string[];
};
