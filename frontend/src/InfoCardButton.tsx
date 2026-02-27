interface InfoCardButtonProps {
  text: string;
}

export function InfoCardButton({ text }: InfoCardButtonProps) {
  return (
    <>
      <div className="hover:bg-amber-50 border p-4 rounded-2xl bg-green-200">
        {text}
      </div>
    </>
  );
}
