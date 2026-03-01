import { Link } from "react-router";
import { ListingType } from "./Listing.interface";

type CardSize = "sm" | "md" | "lg";

interface HousingCardProps {
  id: number;
  campus: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  distanceToCampus: number;
  type: ListingType;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  rentPerMonth: number;
  isAvailable: boolean;
  cardImage?: string;
  size?: CardSize;
}

const sizeConfig: Record<
  CardSize,
  { imageHeight: string; titleSize: string; textSize: string; padding: string }
> = {
  sm: {
    imageHeight: "h-36",
    titleSize: "text-base",
    textSize: "text-xs",
    padding: "p-3",
  },
  md: {
    imageHeight: "h-52",
    titleSize: "text-lg",
    textSize: "text-sm",
    padding: "p-4",
  },
  lg: {
    imageHeight: "h-72",
    titleSize: "text-2xl",
    textSize: "text-base",
    padding: "p-6",
  },
};

export function HousingCard({
  id,
  campus,
  address,
  city,
  state,
  zipCode,
  distanceToCampus,
  type,
  bedrooms,
  bathrooms,
  squareFootage,
  rentPerMonth,
  isAvailable,
  cardImage,
  size = "md",
}: HousingCardProps) {
  const { imageHeight, titleSize, textSize, padding } = sizeConfig[size];

  const typeLabel: Record<ListingType, string> = {
    apartment: "Apartment",
    house: "House",
    studio: "Studio",
    room: "Room",
    condo: "Condo",
  };

  return (
    <Link
      to={`/listing/${id}`}
      className="group block rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
    >
      {/* Image */}
      <div
        className={`relative w-full ${imageHeight} overflow-hidden bg-gray-100`}
      >
        {cardImage ? (
          <img
            src=""
            alt={`${address} listing`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-300">
            🏠
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
            {typeLabel[type]}
          </span>
        </div>
        <div className="absolute top-3 right-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm ${
              isAvailable
                ? "bg-emerald-500 text-white"
                : "bg-gray-400 text-white"
            }`}
          >
            {isAvailable ? "Available" : "Unavailable"}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className={`${padding} flex flex-col gap-2`}>
        {/* Price */}
        <div className="flex items-baseline justify-between">
          <p className={`${titleSize} font-bold text-gray-900`}>
            ${rentPerMonth.toLocaleString()}
            <span className={`${textSize} font-normal text-gray-400 ml-1`}>
              /mo
            </span>
          </p>
          <span className={`${textSize} text-gray-400`}>
            {distanceToCampus} mi to campus
          </span>
        </div>

        {/* Stats row */}
        <div
          className={`flex items-center gap-2 ${textSize} font-medium text-gray-700`}
        >
          {bedrooms > 0 ? (
            <span>
              {bedrooms}{" "}
              <span className="font-normal text-gray-400">
                {bedrooms === 1 ? "bd" : "bds"}
              </span>
            </span>
          ) : (
            <span className="font-normal text-gray-400">Studio</span>
          )}
          <span className="text-gray-200">|</span>
          <span>
            {bathrooms}{" "}
            <span className="font-normal text-gray-400">
              {bathrooms === 1 ? "ba" : "bas"}
            </span>
          </span>
          <span className="text-gray-200">|</span>
          <span>
            {squareFootage.toLocaleString()}{" "}
            <span className="font-normal text-gray-400">sqft</span>
          </span>
        </div>

        {/* Address */}
        <address
          className={`not-italic ${textSize} text-gray-500 leading-snug`}
        >
          {address}, {city}, {state} {zipCode}
        </address>

        {/* Campus tag */}
        <p className={`${textSize} text-indigo-500 font-medium`}>{campus}</p>
      </div>
    </Link>
  );
}
