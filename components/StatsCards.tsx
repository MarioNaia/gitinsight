import { formatNumber } from "@/lib/utils";

type StatsCardsProps = {
  totalRepos: number;
  totalStars: number;
  languageCount: number;
  portfolioScore: number;
};

export default function StatsCards({
  totalRepos,
  totalStars,
  languageCount,
  portfolioScore,
}: StatsCardsProps) {
  const items = [
    { label: "Repositories", value: formatNumber(totalRepos) },
    { label: "Total Stars", value: formatNumber(totalStars) },
    { label: "Languages", value: formatNumber(languageCount) },
    { label: "Portfolio Score", value: `${portfolioScore}/100` },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
        >
          <p className="text-sm text-slate-500">{item.label}</p>
          <p className="mt-2 text-3xl font-bold text-slate-900">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
