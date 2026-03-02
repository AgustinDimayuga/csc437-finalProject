interface ListingStatsStripProps {
  rentPerMonth: number;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
}

export function ListingStatsStrip({
  rentPerMonth,
  bedrooms,
  bathrooms,
  squareFootage,
}: ListingStatsStripProps) {
  const stats = [
    {
      label: "Rent / mo",
      value: `$${rentPerMonth.toLocaleString()}`,
      highlight: true,
    },
    { label: "Bedrooms", value: bedrooms === 0 ? "Studio" : `${bedrooms}` },
    { label: "Bathrooms", value: `${bathrooms}` },
    { label: "Square Ft", value: squareFootage.toLocaleString() },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {stats.map(({ label, value, highlight }) => (
        <div
          key={label}
          className={`rounded-xl p-4 border text-center ${
            highlight
              ? "bg-accent-200 border-accent-500"
              : "bg-brand-100 border-brand-200"
          }`}
        >
          <p className="text-2xl font-bold text-brand-900">{value}</p>
          <p className={`text-xs mt-1 ${highlight ? "text-brand-900" : "text-brand-600"}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}
