import { useParams } from "react-router";
import { Listing, ListingType } from "./Listing.interface";
import { ListingHero } from "./ListingHero";
import { ListingStatsStrip } from "./ListingStatsStrip";
import { ListingContactCard } from "./ListingContactCard";
import { InfoRow } from "./InfoRow";
import { AmenityChip } from "./AmenityChip";
import { useEffect, useState } from "react";

const typeLabel: Record<ListingType, string> = {
  apartment: "Apartment",
  house: "House",
  studio: "Studio",
  room: "Room",
  condo: "Condo",
};

export function ListingInformation({ authToken }: { authToken: string }) {
  const [listing, setListingData] = useState<Listing>();
  const [loadingState, setLoadingState] = useState(true);
  const [errorDuringFetch, setErrorDuringFetch] = useState("");
  const { id } = useParams();
  useEffect(() => {
    async function fetchListings() {
      try {
        const response = await fetch(`/api/listings/${id}`, {
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
  }, [authToken, id]);

  if (loadingState) {
    return (
      <div className="container-information flex items-center justify-center">
        <p className="text-brand-600">Loading listing…</p>
      </div>
    );
  }

  if (errorDuringFetch) {
    return (
      <div className="container-information flex items-center justify-center">
        <p className="text-red-500">{errorDuringFetch}</p>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container-information flex items-center justify-center">
        <div className="text-center space-y-2">
          <p className="text-2xl font-bold text-brand-900">Listing not found</p>
          <p className="text-brand-600">
            The listing you're looking for doesn't exist or was removed.
          </p>
        </div>
      </div>
    );
  }

  const formattedAvailable = new Date(listing.availableFrom).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  return (
    <div className="container-information max-w-6xl mx-auto px-4 pb-8 space-y-8 text-base">
      <ListingHero
        images={listing.images}
        type={listing.type}
        campus={listing.campus}
        postedBy={listing.contact.type}
        address={listing.address}
      />

      {/* Title row */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold text-brand-900">{listing.address}</h1>
        <p className="text-brand-600 text-lg">
          {listing.city}, {listing.state} {listing.zipCode} &mdash;{" "}
          <span className="text-accent-500 font-medium">
            {listing.distanceToCampus} mi to {listing.campus}
          </span>
        </p>
      </div>

      <ListingStatsStrip
        rentPerMonth={listing.rentPerMonth}
        bedrooms={listing.bedrooms}
        bathrooms={listing.bathrooms}
        squareFootage={listing.squareFootage}
      />

      {/* Main two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Property details */}
          <section className="bg-brand-100 rounded-2xl border border-brand-200 p-6 space-y-1">
            <h2 className="text-lg font-bold text-brand-900 mb-3">
              Property Details
            </h2>
            <InfoRow label="Type" value={typeLabel[listing.type]} />
            <InfoRow
              label="Bedrooms"
              value={listing.bedrooms === 0 ? "Studio" : `${listing.bedrooms}`}
            />
            <InfoRow label="Bathrooms" value={`${listing.bathrooms}`} />
            <InfoRow
              label="Square Footage"
              value={`${listing.squareFootage.toLocaleString()} sqft`}
            />
            <InfoRow
              label="Distance to Campus"
              value={`${listing.distanceToCampus} miles`}
            />
            <InfoRow label="Campus" value={listing.campus} />
          </section>

          {/* Lease & pricing */}
          <section className="bg-brand-100 rounded-2xl border border-brand-200 p-6 space-y-1">
            <h2 className="text-lg font-bold text-brand-900 mb-3">
              Lease & Pricing
            </h2>
            <InfoRow
              label="Monthly Rent"
              value={`$${listing.rentPerMonth.toLocaleString()}`}
            />
            <InfoRow
              label="Security Deposit"
              value={`$${listing.depositAmount.toLocaleString()}`}
            />
            <InfoRow
              label="Utilities"
              value={listing.utilitiesIncluded ? "Included" : "Not included"}
            />
            <InfoRow
              label="Lease Duration"
              value={`${listing.leaseDuration} months`}
            />
            <InfoRow label="Available From" value={formattedAvailable} />
          </section>

          {/* Amenities */}
          <section className="bg-brand-100 rounded-2xl border border-brand-200 p-6">
            <h2 className="text-lg font-bold text-brand-900 mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <AmenityChip
                label="Pets Allowed"
                active={listing.amenities.petsAllowed}
                icon="🐾"
              />
              <AmenityChip
                label="Parking"
                active={listing.amenities.parking}
                icon="🚗"
              />
              <AmenityChip
                label="In-Unit Laundry"
                active={listing.amenities.laundryInUnit}
                icon="🧺"
              />
              <AmenityChip
                label="Building Laundry"
                active={listing.amenities.laundryInBuilding}
                icon="👕"
              />
              <AmenityChip
                label="Furnished"
                active={listing.amenities.furnished}
                icon="🛋️"
              />
              <AmenityChip
                label="A/C"
                active={listing.amenities.ac}
                icon="❄️"
              />
              <AmenityChip
                label="Gym"
                active={listing.amenities.gym}
                icon="🏋️"
              />
              <AmenityChip
                label="Pool"
                active={listing.amenities.pool}
                icon="🏊"
              />
              <AmenityChip
                label="Wheelchair Access"
                active={listing.amenities.wheelchairAccessible}
                icon="♿"
              />
            </div>
          </section>
        </div>

        {/* Right column — contact card */}
        <div className="space-y-6">
          <ListingContactCard
            id={listing._id}
            contactName={listing.contact.name}
            contactEmail={listing.contact.email}
            contactPhone={listing.contact.phone}
            postedBy={listing.contact.type}
            address={listing.address}
            listedAt={listing.listedAt}
            updatedAt={listing.updatedAt}
          />
        </div>
      </div>

      {/* Additional photos */}
      {listing.images.length > 1 && (
        <section className="bg-brand-100 rounded-2xl border border-brand-200 p-6">
          <h2 className="text-lg font-bold text-brand-900 mb-4">More Photos</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {listing.images.slice(1).map((img, i) => (
              <div
                key={i}
                className="aspect-video rounded-xl overflow-hidden border border-brand-200"
              >
                <img
                  src={`/uploads/${img}`}
                  alt={`${listing.address} photo ${i + 2}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
