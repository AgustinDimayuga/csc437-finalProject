import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { infoCard } from "./infocard.interface";
import { InfoCardButton } from "./InfoCardButton";
import { Link } from "react-router";

export function InfoCards({
  heading,
  infoText,
  icon,
  buttonText,
  to,
}: infoCard) {
  return (
    <Link to={to}>
      <div className="flex h-full flex-col justify-between gap-6 rounded-xl border border-brand-200 bg-brand-100 p-6 shadow-sm">
        {/* Icon always at the top, fixed height so all cards align */}
        <div className="flex h-20 items-center justify-center text-brand-700">
          <FontAwesomeIcon className="fa-3x" icon={icon} />
        </div>

        {/* Text fills available space to align headers and paragraphs */}
        <div className="flex flex-col flex-1 justify-between gap-6">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-brand-900">
              {heading}
            </h1>
            <p className="text-base leading-relaxed text-brand-600">
              {infoText}
            </p>
          </div>
        </div>

        {/* Button pinned at the bottom */}
        <div>
          <InfoCardButton text={buttonText} />
        </div>
      </div>
    </Link>
  );
}
