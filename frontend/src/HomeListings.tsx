import { HomeFilters } from "./HomeFilters";
import { Listing } from "./Listing.interface";
import { HousingCard } from "./HousingCards";
import { useActionState } from "react";
interface HomeListingsProps {
  listings: Listing[];
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}
export interface FilterData {
  campus: string;
  price: string;
  beds: string;
  baths: string;
  sqft: string;
  postedBy: string;
}
const initialData: FilterData = {
  campus: "",
  price: "",
  beds: "",
  baths: "",
  sqft: "",
  postedBy: "",
};

export function HomeListings({ listings, setListings }: HomeListingsProps) {
  const [data, formSubmit] = useActionState(
    (_prevData: FilterData, formData: FormData): FilterData => ({
      campus: formData.get("campus") as string,
      price: formData.get("price") as string,
      beds: formData.get("beds") as string,
      baths: formData.get("baths") as string,
      sqft: formData.get("sqft") as string,
      postedBy: formData.get("postedBy") as string,
    }),
    initialData,
  );

  const homesToDisplay = listings.filter((listing) => {
    if (data.campus && listing.campus !== data.campus) return false;
    if (data.beds && listing.bedrooms !== parseInt(data.beds)) return false;
    if (data.baths && listing.bathrooms < parseInt(data.baths)) return false;
    if (data.price) {
      if (data.price === "4000+") {
        if (listing.rentPerMonth < 4000) return false;
      } else {
        const [min, max] = data.price.split("-").map(Number);
        if (listing.rentPerMonth < min || listing.rentPerMonth > max)
          return false;
      }
    }
    if (data.sqft) {
      if (data.sqft === "2000+") {
        if (listing.squareFootage < 2000) return false;
      } else {
        const [min, max] = data.sqft.split("-").map(Number);
        if (listing.squareFootage < min || listing.squareFootage > max)
          return false;
      }
    }
    if (data.postedBy && listing.postedBy !== data.postedBy) return false;
    return true;
  });
  return (
    <>
      <div className="container-information flex flex-col items-center gap-4">
        <HomeFilters submitForm={formSubmit} data={data} />
        <div className="grid w-full max-w-content grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homesToDisplay.map((listing) => (
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
              postedBy={listing.postedBy}
              cardImage={listing.images[0]}
              size="lg"
            />
          ))}
        </div>
      </div>
    </>
  );
}
