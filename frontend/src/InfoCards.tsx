import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { infoCard } from "./infocard.interface";
export function InfoCards({ heading, infoText, icon }: infoCard) {
  return (
    <div className="flex min-h-112 flex-col p-8 gap-6 border border-black rounded-2xl text-center bg-taupe-300">
      {/* Icon always at the top, fixed height so all cards align */}
      <div className="flex items-center justify-center h-24">
        <FontAwesomeIcon className="fa-5x" icon={icon} />
      </div>

      {/* Text pinned below icon consistently */}
      <div className="flex flex-col gap-10">
        <h1 className="text-4xl font-bold tracking-tight leading-tight">
          {heading}
        </h1>
        <p className="text-base font-light leading-relaxed tracking-wide text-gray-700">
          {infoText}
        </p>
      </div>
    </div>
  );
}
