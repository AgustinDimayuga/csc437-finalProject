import { useActionState, useRef, useEffect } from "react";
import { Listing, ListingType } from "./Listing.interface";

interface ListAHomeProps {
  userName: string;
  emailAddress: string;
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}

type FormState = {
  errors: Partial<Record<string, string>>;
  success?: boolean;
};

const initialState: FormState = { errors: {} };

export function ListAHome({ userName, emailAddress, setListings }: ListAHomeProps) {
  const [formState, formAction] = useActionState<FormState, FormData>(
    (_prev, formData) => {
      const errors: Record<string, string> = {};

      const campus = (formData.get("campus") as string).trim();
      const address = (formData.get("address") as string).trim();
      const city = (formData.get("city") as string).trim();
      const stateField = (formData.get("state") as string).trim();
      const zipCode = (formData.get("zipCode") as string).trim();
      const distanceToCampus = parseFloat(formData.get("distanceToCampus") as string);
      const type = formData.get("type") as ListingType;
      const bedrooms = parseInt(formData.get("bedrooms") as string, 10);
      const bathrooms = parseFloat(formData.get("bathrooms") as string);
      const squareFootage = parseInt(formData.get("squareFootage") as string, 10);
      const rentPerMonth = parseInt(formData.get("rentPerMonth") as string, 10);
      const depositAmount = parseInt(formData.get("depositAmount") as string, 10);
      const utilitiesIncluded = formData.get("utilitiesIncluded") === "true";
      const availableFrom = (formData.get("availableFrom") as string).trim();
      const leaseDuration = parseInt(formData.get("leaseDuration") as string, 10);
      const contactName = (formData.get("contactName") as string).trim();
      const contactEmail = (formData.get("contactEmail") as string).trim();
      const contactPhone = (formData.get("contactPhone") as string).trim();
      const postedBy = formData.get("postedBy") as "agent" | "student";

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!campus) errors.campus = "Campus is required";
      if (!address) errors.address = "Address is required";
      if (!city) errors.city = "City is required";
      if (!stateField) errors.state = "State is required";
      if (!zipCode) errors.zipCode = "Zip code is required";
      if (isNaN(distanceToCampus) || distanceToCampus < 0) errors.distanceToCampus = "Enter a valid distance";
      if (isNaN(bedrooms) || bedrooms < 0) errors.bedrooms = "Enter valid bedrooms";
      if (isNaN(bathrooms) || bathrooms < 0) errors.bathrooms = "Enter valid bathrooms";
      if (isNaN(squareFootage) || squareFootage <= 0) errors.squareFootage = "Enter valid square footage";
      if (isNaN(rentPerMonth) || rentPerMonth <= 0) errors.rentPerMonth = "Enter valid rent";
      if (isNaN(depositAmount) || depositAmount < 0) errors.depositAmount = "Enter valid deposit";
      if (!availableFrom) errors.availableFrom = "Available from date is required";
      if (isNaN(leaseDuration) || leaseDuration <= 0) errors.leaseDuration = "Enter valid lease duration";
      if (!contactName) errors.contactName = "Contact name is required";
      if (!emailRegex.test(contactEmail)) errors.contactEmail = "Enter a valid email";

      if (Object.keys(errors).length > 0) return { errors };

      const today = new Date().toISOString().split("T")[0];
      const newListing: Omit<Listing, "id"> = {
        campus,
        address,
        city,
        state: stateField,
        zipCode,
        distanceToCampus,
        type,
        bedrooms,
        bathrooms,
        squareFootage,
        rentPerMonth,
        depositAmount,
        utilitiesIncluded,
        availableFrom,
        leaseDuration,
        amenities: {
          petsAllowed: formData.get("petsAllowed") === "on",
          parking: formData.get("parking") === "on",
          laundryInUnit: formData.get("laundryInUnit") === "on",
          laundryInBuilding: formData.get("laundryInBuilding") === "on",
          furnished: formData.get("furnished") === "on",
          ac: formData.get("ac") === "on",
          gym: formData.get("gym") === "on",
          pool: formData.get("pool") === "on",
          wheelchairAccessible: formData.get("wheelchairAccessible") === "on",
        },
        images: [],
        contactName,
        contactEmail,
        contactPhone: contactPhone || undefined,
        listedAt: today,
        updatedAt: today,
        postedBy,
      };

      setListings((prev) => {
        const nextId = prev.length > 0 ? Math.max(...prev.map((l) => l.id)) + 1 : 1;
        return [...prev, { ...newListing, id: nextId }];
      });
      return { errors: {}, success: true };
    },
    initialState,
  );

  const campusRef = useRef<HTMLSelectElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const zipCodeRef = useRef<HTMLInputElement>(null);
  const distanceToCampusRef = useRef<HTMLInputElement>(null);
  const squareFootageRef = useRef<HTMLInputElement>(null);
  const bedroomsRef = useRef<HTMLInputElement>(null);
  const bathroomsRef = useRef<HTMLInputElement>(null);
  const rentPerMonthRef = useRef<HTMLInputElement>(null);
  const depositAmountRef = useRef<HTMLInputElement>(null);
  const availableFromRef = useRef<HTMLInputElement>(null);
  const leaseDurationRef = useRef<HTMLInputElement>(null);
  const contactNameRef = useRef<HTMLInputElement>(null);
  const contactEmailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const e = formState.errors;
    if (e.campus) campusRef.current?.focus();
    else if (e.address) addressRef.current?.focus();
    else if (e.city) cityRef.current?.focus();
    else if (e.state) stateRef.current?.focus();
    else if (e.zipCode) zipCodeRef.current?.focus();
    else if (e.distanceToCampus) distanceToCampusRef.current?.focus();
    else if (e.squareFootage) squareFootageRef.current?.focus();
    else if (e.bedrooms) bedroomsRef.current?.focus();
    else if (e.bathrooms) bathroomsRef.current?.focus();
    else if (e.rentPerMonth) rentPerMonthRef.current?.focus();
    else if (e.depositAmount) depositAmountRef.current?.focus();
    else if (e.availableFrom) availableFromRef.current?.focus();
    else if (e.leaseDuration) leaseDurationRef.current?.focus();
    else if (e.contactName) contactNameRef.current?.focus();
    else if (e.contactEmail) contactEmailRef.current?.focus();
  }, [formState.errors]);

  const inputClass =
    "w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200";
  const labelClass = "text-sm font-semibold text-brand-700";
  const fieldClass = "flex flex-col gap-2";
  const sectionClass = "rounded-2xl border border-brand-200 bg-brand-100 p-6 shadow-sm";

  if (formState.success) {
    return (
      <div className="container-information">
        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-brand-900">Listing Submitted!</h2>
          <p className="mt-2 text-brand-700">Your listing has been added and is now visible on the listings page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-information">
      <h1 className="mb-6 text-2xl font-bold text-brand-900">List Your Home</h1>

      <form action={formAction} className="flex flex-col gap-6">

        {/* Location */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">Location</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="campus" className={labelClass}>Campus</label>
              <select ref={campusRef} id="campus" name="campus" aria-invalid={!!formState.errors.campus} className={inputClass}>
                <option value="">Select a campus</option>
                <option value="Cal Poly SLO">Cal Poly SLO</option>
                <option value="UCLA">UCLA</option>
                <option value="UC Berkeley">UC Berkeley</option>
              </select>
              {formState.errors.campus && <span className="text-sm text-accent-500">{formState.errors.campus}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="address" className={labelClass}>Address</label>
              <input ref={addressRef} id="address" name="address" type="text" placeholder="123 Main St" aria-invalid={!!formState.errors.address} className={inputClass} />
              {formState.errors.address && <span className="text-sm text-accent-500">{formState.errors.address}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="city" className={labelClass}>City</label>
              <input ref={cityRef} id="city" name="city" type="text" placeholder="San Luis Obispo" aria-invalid={!!formState.errors.city} className={inputClass} />
              {formState.errors.city && <span className="text-sm text-accent-500">{formState.errors.city}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="state" className={labelClass}>State</label>
              <input ref={stateRef} id="state" name="state" type="text" placeholder="CA" aria-invalid={!!formState.errors.state} className={inputClass} />
              {formState.errors.state && <span className="text-sm text-accent-500">{formState.errors.state}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="zipCode" className={labelClass}>Zip Code</label>
              <input ref={zipCodeRef} id="zipCode" name="zipCode" type="text" placeholder="93405" aria-invalid={!!formState.errors.zipCode} className={inputClass} />
              {formState.errors.zipCode && <span className="text-sm text-accent-500">{formState.errors.zipCode}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="distanceToCampus" className={labelClass}>Distance to Campus (miles)</label>
              <input ref={distanceToCampusRef} id="distanceToCampus" name="distanceToCampus" type="number" step="0.1" min="0" placeholder="0.5" aria-invalid={!!formState.errors.distanceToCampus} className={inputClass} />
              {formState.errors.distanceToCampus && <span className="text-sm text-accent-500">{formState.errors.distanceToCampus}</span>}
            </div>
          </div>
        </fieldset>

        {/* Property Details */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">Property Details</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="type" className={labelClass}>Property Type</label>
              <select id="type" name="type" className={inputClass}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="room">Room</option>
                <option value="condo">Condo</option>
              </select>
            </div>
            <div className={fieldClass}>
              <label htmlFor="squareFootage" className={labelClass}>Square Footage</label>
              <input ref={squareFootageRef} id="squareFootage" name="squareFootage" type="number" min="1" placeholder="850" aria-invalid={!!formState.errors.squareFootage} className={inputClass} />
              {formState.errors.squareFootage && <span className="text-sm text-accent-500">{formState.errors.squareFootage}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="bedrooms" className={labelClass}>Bedrooms</label>
              <input ref={bedroomsRef} id="bedrooms" name="bedrooms" type="number" min="0" placeholder="2" aria-invalid={!!formState.errors.bedrooms} className={inputClass} />
              {formState.errors.bedrooms && <span className="text-sm text-accent-500">{formState.errors.bedrooms}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="bathrooms" className={labelClass}>Bathrooms</label>
              <input ref={bathroomsRef} id="bathrooms" name="bathrooms" type="number" min="0" step="0.5" placeholder="1" aria-invalid={!!formState.errors.bathrooms} className={inputClass} />
              {formState.errors.bathrooms && <span className="text-sm text-accent-500">{formState.errors.bathrooms}</span>}
            </div>
          </div>
        </fieldset>

        {/* Pricing & Availability */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">Pricing & Availability</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="rentPerMonth" className={labelClass}>Rent per Month ($)</label>
              <input ref={rentPerMonthRef} id="rentPerMonth" name="rentPerMonth" type="number" min="1" placeholder="1800" aria-invalid={!!formState.errors.rentPerMonth} className={inputClass} />
              {formState.errors.rentPerMonth && <span className="text-sm text-accent-500">{formState.errors.rentPerMonth}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="depositAmount" className={labelClass}>Deposit Amount ($)</label>
              <input ref={depositAmountRef} id="depositAmount" name="depositAmount" type="number" min="0" placeholder="1800" aria-invalid={!!formState.errors.depositAmount} className={inputClass} />
              {formState.errors.depositAmount && <span className="text-sm text-accent-500">{formState.errors.depositAmount}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="availableFrom" className={labelClass}>Available From</label>
              <input ref={availableFromRef} id="availableFrom" name="availableFrom" type="date" aria-invalid={!!formState.errors.availableFrom} className={inputClass} />
              {formState.errors.availableFrom && <span className="text-sm text-accent-500">{formState.errors.availableFrom}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="leaseDuration" className={labelClass}>Lease Duration (months)</label>
              <input ref={leaseDurationRef} id="leaseDuration" name="leaseDuration" type="number" min="1" placeholder="12" aria-invalid={!!formState.errors.leaseDuration} className={inputClass} />
              {formState.errors.leaseDuration && <span className="text-sm text-accent-500">{formState.errors.leaseDuration}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="utilitiesIncluded" className={labelClass}>Utilities Included</label>
              <select id="utilitiesIncluded" name="utilitiesIncluded" className={inputClass}>
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Amenities */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">Amenities</legend>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
            {[
              { name: "petsAllowed", label: "Pets Allowed" },
              { name: "parking", label: "Parking" },
              { name: "laundryInUnit", label: "Laundry In Unit" },
              { name: "laundryInBuilding", label: "Laundry In Building" },
              { name: "furnished", label: "Furnished" },
              { name: "ac", label: "AC" },
              { name: "gym", label: "Gym" },
              { name: "pool", label: "Pool" },
              { name: "wheelchairAccessible", label: "Wheelchair Accessible" },
            ].map(({ name, label }) => (
              <label key={name} className="flex cursor-pointer items-center gap-2 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm text-brand-700 transition hover:border-brand-400 hover:bg-brand-50">
                <input type="checkbox" name={name} className="h-4 w-4 shrink-0 accent-brand-700" />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Contact */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">Contact Info</legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="contactName" className={labelClass}>Contact Name</label>
              <input ref={contactNameRef} id="contactName" name="contactName" type="text" placeholder="Your name"
                defaultValue={userName} aria-invalid={!!formState.errors.contactName} className={inputClass} />
              {formState.errors.contactName && <span className="text-sm text-accent-500">{formState.errors.contactName}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="contactEmail" className={labelClass}>Contact Email</label>
              <input ref={contactEmailRef} id="contactEmail" name="contactEmail" type="text" placeholder="you@example.com"
                defaultValue={emailAddress} aria-invalid={!!formState.errors.contactEmail} className={inputClass} />
              {formState.errors.contactEmail && <span className="text-sm text-accent-500">{formState.errors.contactEmail}</span>}
            </div>
            <div className={fieldClass}>
              <label htmlFor="contactPhone" className={labelClass}>Contact Phone (optional)</label>
              <input id="contactPhone" name="contactPhone" type="tel" placeholder="805-555-0000" className={inputClass} />
            </div>
            <div className={fieldClass}>
              <label htmlFor="postedBy" className={labelClass}>Posted By</label>
              <select id="postedBy" name="postedBy" className={inputClass}>
                <option value="student">Student</option>
                <option value="agent">Agent</option>
              </select>
            </div>
          </div>
        </fieldset>

        <button
          type="submit"
          className="w-full rounded-lg bg-brand-900 px-4 py-3 font-medium text-white transition hover:bg-brand-800 md:w-auto md:self-start"
        >
          Submit Listing
        </button>
      </form>
    </div>
  );
}
