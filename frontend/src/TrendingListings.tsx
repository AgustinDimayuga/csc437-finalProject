import { MoreInformation } from "./MoreInformation";
import { HousingCard } from "./HousingCards";
import { initialListings } from "./ListingsArrays";

export function TrendingListings() {
  const trending = initialListings.slice(0, 3);

  return (
    <MoreInformation
      heading="Trending Homes in San Luis Obispo"
      className="bg-stone-50"
    >
      {trending.map((listing) => (
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
          size="lg"
        />
      ))}
    </MoreInformation>
  );
}
