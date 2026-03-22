import { HomeFilters } from "./HomeFilters";
import { Listing } from "./Listing.interface";
import { HousingCard } from "./HousingCards";
import { useActionState, useEffect, useState } from "react";
interface HomeListingsProps {
  authToken: null | string;
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

export function HomeListings({ authToken }: HomeListingsProps) {
  const [data, formSubmit, isPending] = useActionState(
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
  const [listingData, setListingData] = useState<Listing[]>([]);
  const [loadingState, setLoadingState] = useState(true);
  const [errorDuringFetch, setErrorDuringFetch] = useState("");
  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch("/api/listings", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        // If response is an error (ie., not okay throw error)
        if (!response.ok) {
          throw new Error(
            `Error: HTTP ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();
        setListingData(result);
      } catch (error: any) {
        console.error(error.message);
        setErrorDuringFetch(error.message);
      } finally {
        setLoadingState(false);
      }
    }
    fetchListings();
  }, [authToken]);

  const homesToDisplay = listingData.filter((listing) => {
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
    if (data.postedBy && listing.contact.type !== data.postedBy) return false;
    return true;
  });
  return (
    <>
      <div className="container-information flex flex-col items-center gap-4">
        <HomeFilters submitForm={formSubmit} data={data} />
        <div className="grid w-full max-w-content grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {loadingState && <p>Loading...</p>}
          {errorDuringFetch.length !== 0 && <span>{errorDuringFetch}</span>}
          {homesToDisplay.map((listing) => (
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
        </div>
      </div>
    </>
  );
}
