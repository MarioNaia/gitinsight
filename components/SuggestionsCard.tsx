type SuggestionsCardProps = {
  suggestions: string[];
};

export default function SuggestionsCard({
  suggestions,
}: SuggestionsCardProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-xl font-semibold text-slate-900">
        Improvement Suggestions
      </h3>

      <ul className="mt-4 space-y-3">
        {suggestions.map((suggestion, index) => (
          <li
            key={`${suggestion}-${index}`}
            className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-700"
          >
            {suggestion}
          </li>
        ))}
      </ul>
    </div>
  );
}
