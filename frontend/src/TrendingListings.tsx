import { MoreInformation } from "./MoreInformation";
import { HousingCard } from "./HousingCards";
import { initialListings } from "./ListingsArrays";
import { Listing } from "./Listing.interface";

export function TrendingListings({ allListings }: { allListings: Listing[] }) {
  const trending = allListings.slice(0, 3);

  return (
    <MoreInformation
      heading="Trending Homes in San Luis Obispo"
      className="bg-brand-50"
    >
      {trending.map((listing) => (
        <HousingCard
          key={listing._id}
          id={listing._id}
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
          postedBy={listing.contact.type}
          cardImage={listing.images[0]}
          size="lg"
        />
      ))}
    </MoreInformation>
  );
}
