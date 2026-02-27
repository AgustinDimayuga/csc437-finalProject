import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { infoCard } from "./infocard.interface";
import { InfoCardButton } from "./InfoCardButton";

export function InfoCards({ heading, infoText, icon, buttonText }: infoCard) {
  return (
    <div className="flex flex-col p-8 gap-6 justify-between border border-black rounded-2xl text-center bg-taupe-300 h-full">
      {/* Icon always at the top, fixed height so all cards align */}
      <div className="flex items-center justify-center h-24">
        <FontAwesomeIcon className="fa-5x" icon={icon} />
      </div>

      {/* Text fills available space to align headers and paragraphs */}
      <div className="flex flex-col flex-1 justify-between gap-6">
        <div>
          <h1 className="text-4xl mb-8 font-bold tracking-tight leading-tight">
            {heading}
          </h1>
          <p className="text-base font-light leading-relaxed tracking-wide text-gray-700">
            {infoText}
          </p>
        </div>
      </div>

      {/* Button pinned at the bottom */}
      <div>
        <InfoCardButton text={buttonText} />
      </div>
    </div>
  );
}
