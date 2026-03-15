"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import ProfileCard from "@/components/ProfileCard";
import StatsCards from "@/components/StatsCards";
import LanguagesChart from "@/components/LanguagesChart";
import RepoCard from "@/components/RepoCard";
import SuggestionsCard from "@/components/SuggestionsCard";
import { AnalyzedGitHubData } from "@/types/github";

export default function HomePage() {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<AnalyzedGitHubData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSearch() {
    if (!username.trim()) {
      setError("Please enter a GitHub username.");
      setData(null);
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const response = await fetch(
        `/api/github?username=${encodeURIComponent(username.trim())}`
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setData(result);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to fetch data.";
      setError(message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-4 py-1 text-sm text-slate-600">
            Hackathon Project
          </span>

          <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            GitInsight
          </h1>

          <p className="mt-4 text-lg text-slate-600">
            Analyze any GitHub profile and generate portfolio insights,
            statistics, and improvement suggestions.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          <SearchBar
            username={username}
            setUsername={setUsername}
            onSearch={handleSearch}
            isLoading={isLoading}
          />

          {error ? (
            <p className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}
        </div>

        {data ? (
          <div className="mt-10 space-y-6">
            <ProfileCard user={data.user} />

            <StatsCards
              totalRepos={data.stats.totalRepos}
              totalStars={data.stats.totalStars}
              languageCount={data.stats.topLanguages.length}
              portfolioScore={data.stats.portfolioScore}
            />

            <div className="grid gap-6 lg:grid-cols-2">
              <LanguagesChart data={data.stats.topLanguages} />
              <RepoCard repo={data.stats.mostStarredRepo} />
            </div>

            <SuggestionsCard suggestions={data.suggestions} />
          </div>
        ) : (
          <div className="mt-12 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-900">
              Ready to analyze a profile
            </h2>
            <p className="mt-2 text-slate-600">
              Enter a GitHub username above to generate the portfolio report.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
