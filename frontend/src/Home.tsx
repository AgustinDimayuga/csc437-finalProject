import { useState, useEffect } from "react";
import { Hero } from "./Hero";
import { TrendingListings } from "./TrendingListings";
import { Listing } from "./Listing.interface";
import { InformationLinks } from "./InformationLinks";

export function Home({ authToken }: { authToken: string }) {
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
  return (
    <>
      <div className="flex flex-col">
        <Hero
          heading="Student Friendly Options"
          subHeading="Find Your Next Off-Campus Destination"
        />
        <InformationLinks />
        {loadingState && (
          <p className="text-center py-8 text-brand-600">Loading listings…</p>
        )}
        {errorDuringFetch && (
          <p className="text-center py-8 text-red-500">{errorDuringFetch}</p>
        )}
        {!loadingState && !errorDuringFetch && (
          <TrendingListings allListings={listingData} />
        )}
      </div>
    </>
  );
}
