import { GitHubRepo, GitHubUser } from "@/types/github";

const BASE_URL = "https://api.github.com";

function getHeaders() {
  const token = process.env.GITHUB_TOKEN;

  return {
    Accept: "application/vnd.github+json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchGitHubUser(username: string): Promise<GitHubUser> {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    headers: getHeaders(),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub user");
  }

  return response.json();
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=100&sort=updated`,
    {
      headers: getHeaders(),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch GitHub repositories");
  }

  return response.json();
}
