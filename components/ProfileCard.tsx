import { GitHubUser } from "@/types/github";

type ProfileCardProps = {
  user: GitHubUser;
};

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="h-24 w-24 rounded-full border border-slate-200 object-cover"
        />

        <div className="flex-1">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold text-slate-900">
              {user.name || user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-slate-600 hover:underline"
            >
              @{user.login}
            </a>
          </div>

          <p className="mt-3 text-sm text-slate-700">
            {user.bio || "No bio available."}
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-700">
            <span>
              <strong>{user.followers}</strong> followers
            </span>
            <span>
              <strong>{user.following}</strong> following
            </span>
            <span>
              <strong>{user.public_repos}</strong> public repos
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
