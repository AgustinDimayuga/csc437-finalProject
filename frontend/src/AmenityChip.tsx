interface AmenityChipProps {
  label: string;
  active: boolean;
  icon: string;
}

export function AmenityChip({ label, active, icon }: AmenityChipProps) {
  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium border transition-colors ${
        active
          ? "bg-accent-200 border-accent-500 text-brand-900"
          : "bg-brand-50 border-brand-200 text-brand-900 line-through"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}
