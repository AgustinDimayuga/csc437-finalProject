export type ListingType = "apartment" | "house" | "studio" | "room" | "condo";
export interface Listing {
  id: number;
  campus: string;

  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  distanceToCampus: number; // in miles

  // Property Details
  type: ListingType;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;

  // Pricing
  rentPerMonth: number;
  depositAmount: number;
  utilitiesIncluded: boolean;

  // Availability
  availableFrom: string; // ISO date string
  leaseDuration: number; // in months

  // Amenities
  amenities: {
    petsAllowed: boolean;
    parking: boolean;
    laundryInUnit: boolean;
    laundryInBuilding: boolean;
    furnished: boolean;
    ac: boolean;
    gym: boolean;
    pool: boolean;
    wheelchairAccessible: boolean;
  };

  // Media & Contact
  images: string[]; // URLs
  contactName: string;
  contactEmail: string;
  contactPhone?: string;

  // Meta
  listedAt: string; // ISO date string
  updatedAt: string;
  postedBy: "agent" | "student";
}
