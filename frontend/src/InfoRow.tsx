interface InfoRowProps {
  label: string;
  value: string;
}

export function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-brand-200 last:border-0">
      <span className="text-sm text-brand-600">{label}</span>
      <span className="text-sm font-semibold text-brand-900">{value}</span>
    </div>
  );
}
