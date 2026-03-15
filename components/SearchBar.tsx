type SearchBarProps = {
  username: string;
  setUsername: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
};

export default function SearchBar({
  username,
  setUsername,
  onSearch,
  isLoading,
}: SearchBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSearch();
        }}
        placeholder="Enter GitHub username..."
        className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-slate-500"
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="rounded-2xl bg-slate-900 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isLoading ? "Analyzing..." : "Analyze"}
      </button>
    </div>
  );
}
