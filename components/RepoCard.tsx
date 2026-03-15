import { GitHubRepo } from "@/types/github";

type RepoCardProps = {
  repo: GitHubRepo | null;
};

export default function RepoCard({ repo }: RepoCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">
        Most Starred Repository
      </h3>

      {repo ? (
        <div className="mt-4">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="text-lg font-semibold text-slate-900 hover:underline"
          >
            {repo.name}
          </a>

          <p className="mt-2 text-sm text-slate-700">
            {repo.description || "No description available."}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-600">
            <span>⭐ {repo.stargazers_count} stars</span>
            <span>🧠 {repo.language || "Unknown"}</span>
            {repo.homepage ? (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                Live Demo
              </a>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-slate-600">
          No repository data available.
        </p>
      )}
    </div>
  );
}
