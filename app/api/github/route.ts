import { NextRequest, NextResponse } from "next/server";
import { fetchGitHubRepos, fetchGitHubUser } from "@/lib/github";
import { calculatePortfolioScore, generateSuggestions } from "@/lib/scoring";
import {
  getLanguageStats,
  getMostStarredRepo,
  getNonForkRepos,
  getTotalStars,
} from "@/lib/utils";
import { AnalyzedGitHubData } from "@/types/github";

export async function GET(request: NextRequest) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return NextResponse.json(
      { error: "Username is required." },
      { status: 400 }
    );
  }

  try {
    const [user, repos] = await Promise.all([
      fetchGitHubUser(username),
      fetchGitHubRepos(username),
    ]);

    const filteredRepos = getNonForkRepos(repos);
    const totalStars = getTotalStars(filteredRepos);
    const topLanguages = getLanguageStats(filteredRepos).slice(0, 5);
    const mostStarredRepo = getMostStarredRepo(filteredRepos);
    const portfolioScore = calculatePortfolioScore({
      repos: filteredRepos,
      followers: user.followers,
      totalStars,
      languageCount: topLanguages.length,
    });
    const suggestions = generateSuggestions(filteredRepos);

    const result: AnalyzedGitHubData = {
      user,
      stats: {
        totalRepos: filteredRepos.length,
        totalStars,
        topLanguages,
        mostStarredRepo,
        portfolioScore,
      },
      suggestions,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Could not analyze this GitHub profile." },
      { status: 500 }
    );
  }
}
