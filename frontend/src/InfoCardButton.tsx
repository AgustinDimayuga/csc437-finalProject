interface InfoCardButtonProps {
  text: string;
}

export function InfoCardButton({ text }: InfoCardButtonProps) {
  return (
    <>
      <div className="w-full rounded-lg bg-slate-900 px-4 py-2 text-center font-medium text-white transition hover:bg-slate-800">
        {text}
      </div>
    </>
  );
}
