import { HomeFilters } from "./HomeFilters";
import { Listing } from "./Listing.interface";
import { HousingCard } from "./HousingCards";
interface HomeListingsProps {
  listings: Listing[];
}

export function HomeListings({ listings }: HomeListingsProps) {
  return (
    <>
      <div className="container-information flex flex-col items-center gap-4">
        <HomeFilters />
        <div className="grid w-full max-w-content grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <HousingCard
              key={listing.id}
              id={listing.id}
              campus={listing.campus}
              address={listing.address}
              city={listing.city}
              state={listing.state}
              zipCode={listing.zipCode}
              distanceToCampus={listing.distanceToCampus}
              type={listing.type}
              bedrooms={listing.bedrooms}
              bathrooms={listing.bathrooms}
              squareFootage={listing.squareFootage}
              rentPerMonth={listing.rentPerMonth}
              isAvailable={listing.isAvailable}
              cardImage={listing.images[0]}
              size="md"
            />
          ))}
        </div>
      </div>
    </>
  );
}
