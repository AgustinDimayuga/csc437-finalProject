import { ListingType } from "./Listing.interface";

interface ListingHeroProps {
  images: string[];
  type: ListingType;
  campus: string;
  postedBy: "agent" | "student";
  address: string;
}

const typeLabel: Record<ListingType, string> = {
  apartment: "Apartment",
  house: "House",
  studio: "Studio",
  room: "Room",
  condo: "Condo",
};

export function ListingHero({
  images,
  type,
  campus,
  postedBy,
  address,
}: ListingHeroProps) {
  return (
    <div className="w-full h-72 md:h-96 rounded-2xl overflow-hidden bg-brand-100 border border-brand-200 flex items-center justify-center relative">
      {images.length > 0 ? (
        <img
          src={images[0]}
          alt={`${address} listing`}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="flex flex-col items-center gap-3 text-brand-700">
          <span className="text-8xl">🏠</span>
          <span className="text-sm">No photos available</span>
        </div>
      )}

      <div className="absolute top-3 left-3 flex flex-col sm:flex-row gap-1 sm:gap-2">
        <span className="bg-brand-900/80 backdrop-blur-sm text-brand-50 text-xs font-semibold px-2.5 py-1 rounded-full">
          {typeLabel[type]}
        </span>
        <span className="bg-accent-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
          {campus}
        </span>
      </div>

      {/* Right badge: posted by */}
      <div className="absolute top-3 right-3">
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full shadow ${
            postedBy === "agent"
              ? "bg-accent-500 text-white"
              : "bg-red-600 text-white"
          }`}
        >
          {postedBy === "agent" ? "Agent Listed" : "Student Listed"}
        </span>
      </div>
    </div>
  );
}
