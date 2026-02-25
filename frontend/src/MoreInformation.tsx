import { faCow } from "@fortawesome/free-solid-svg-icons";
import { infoCard } from "./infocard.interface";
import { ReactNode } from "react";

interface MoreInformationProps {
  children?: ReactNode;
  className?: string;
  heading?: string; // optional, allows additional styling
}
export function MoreInformation({
  children,
  className,
  heading,
}: MoreInformationProps) {
  return (
    <div className={`w-full ${className ?? ""} `}>
      <div className="px-6 py-14 mx-auto max-w-content ">
        <h2 className=" mb-8 text-fluidH2 text-gray-600">{heading}</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-center">
          {children}
        </div>
      </div>
    </div>
  );
}
