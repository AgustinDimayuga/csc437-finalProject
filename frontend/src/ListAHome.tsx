import { useActionState, useRef, useEffect, useState, useId } from "react";
import { useNavigate } from "react-router";
import { VALID_ROUTES } from "./shared/ValidRoutes";

interface ListAHomeProps {
  authToken: string;
}

type FormState = {
  errors: Partial<Record<string, string>>;
  success?: boolean;
  apiError?: string;
};

const initialState: FormState = { errors: {} };

async function readAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (err) => reject(err);
  });
}

export function ListAHome({ authToken }: ListAHomeProps) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputId = useId();
  const navigate = useNavigate();

  const [formState, formAction, isPending] = useActionState<
    FormState,
    FormData
  >(async (_prev, formData) => {
    const errors: Record<string, string> = {};

    const campus = (formData.get("campus") as string).trim();
    const address = (formData.get("address") as string).trim();
    const city = (formData.get("city") as string).trim();
    const stateField = (formData.get("state") as string).trim();
    const zipCode = (formData.get("zipCode") as string).trim();
    const distanceToCampus = parseFloat(
      formData.get("distanceToCampus") as string,
    );
    const type = formData.get("type") as string;
    const bedrooms = parseInt(formData.get("bedrooms") as string, 10);
    const bathrooms = parseFloat(formData.get("bathrooms") as string);
    const squareFootage = parseInt(formData.get("squareFootage") as string, 10);
    const rentPerMonth = parseFloat(formData.get("rentPerMonth") as string);
    const depositAmount = parseFloat(formData.get("depositAmount") as string);
    const utilitiesIncluded = formData.get("utilitiesIncluded") as string;
    const availableFrom = (formData.get("availableFrom") as string).trim();
    const leaseDuration = parseInt(formData.get("leaseDuration") as string, 10);
    const imageFiles = formData.getAll("images") as File[];
    const validImages = imageFiles.filter((f) => f.size > 0);

    if (!campus) errors.campus = "Campus is required";
    if (!address) errors.address = "Address is required";
    if (!city) errors.city = "City is required";
    if (!stateField) errors.state = "State is required";
    if (!zipCode) errors.zipCode = "Zip code is required";
    if (isNaN(distanceToCampus) || distanceToCampus < 0)
      errors.distanceToCampus = "Enter a valid distance";
    if (isNaN(bedrooms) || bedrooms < 0)
      errors.bedrooms = "Enter valid bedrooms";
    if (isNaN(bathrooms) || bathrooms < 0)
      errors.bathrooms = "Enter valid bathrooms";
    if (isNaN(squareFootage) || squareFootage <= 0)
      errors.squareFootage = "Enter valid square footage";
    if (isNaN(rentPerMonth) || rentPerMonth <= 0)
      errors.rentPerMonth = "Enter valid rent";
    if (isNaN(depositAmount) || depositAmount < 0)
      errors.depositAmount = "Enter valid deposit";
    if (!availableFrom)
      errors.availableFrom = "Available from date is required";
    if (isNaN(leaseDuration) || leaseDuration <= 0)
      errors.leaseDuration = "Enter valid lease duration";
    if (validImages.length > 10) errors.images = "Maximum 10 images allowed";

    if (Object.keys(errors).length > 0) return { errors };

    const amenities = {
      petsAllowed: formData.get("petsAllowed") === "on",
      parking: formData.get("parking") === "on",
      laundryInUnit: formData.get("laundryInUnit") === "on",
      laundryInBuilding: formData.get("laundryInBuilding") === "on",
      furnished: formData.get("furnished") === "on",
      ac: formData.get("ac") === "on",
      gym: formData.get("gym") === "on",
      pool: formData.get("pool") === "on",
      wheelchairAccessible: formData.get("wheelchairAccessible") === "on",
    };

    const apiFormData = new FormData();
    apiFormData.append("campus", campus);
    apiFormData.append("address", address);
    apiFormData.append("city", city);
    apiFormData.append("state", stateField);
    apiFormData.append("zipCode", zipCode);
    apiFormData.append("distanceToCampus", String(distanceToCampus));
    apiFormData.append("type", type);
    apiFormData.append("bedrooms", String(bedrooms));
    apiFormData.append("bathrooms", String(bathrooms));
    apiFormData.append("squareFootage", String(squareFootage));
    apiFormData.append("rentPerMonth", String(rentPerMonth));
    apiFormData.append("depositAmount", String(depositAmount));
    apiFormData.append("utilitiesIncluded", utilitiesIncluded);
    apiFormData.append("availableFrom", availableFrom);
    apiFormData.append("leaseDuration", String(leaseDuration));
    apiFormData.append("amenities", JSON.stringify(amenities));
    for (const file of validImages) {
      apiFormData.append("images", file);
    }

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: { Authorization: `Bearer ${authToken}` },
        body: apiFormData,
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        return {
          errors: {},
          apiError:
            data.message ?? "Failed to create listing. Please try again.",
        };
      }

      const { _id } = await response.json();
      navigate(`/listing/${_id}`);
      return { errors: {}, success: true };
    } catch {
      return { errors: {}, apiError: "Network error. Please try again." };
    }
  }, initialState);

  // Refs for focus-on-error accessibility
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
  const imagesRef = useRef<HTMLInputElement>(null);

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
    else if (e.images) imagesRef.current?.focus();
  }, [formState.errors]);

  const inputClass =
    "w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 outline-none transition focus:border-brand-700 focus:ring-2 focus:ring-brand-200";
  const labelClass = "text-sm font-semibold text-brand-700";
  const fieldClass = "flex flex-col gap-2";
  const sectionClass =
    "rounded-2xl border border-brand-200 bg-brand-100 p-6 shadow-sm";

  if (formState.success) {
    return (
      <div className="container-information">
        <div className={sectionClass}>
          <h2 className="text-xl font-bold text-brand-900">
            Listing Submitted!
          </h2>
          <p className="mt-2 text-brand-700">
            Your listing has been added and is now visible on the listings page.
          </p>
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
          <legend className="mb-4 text-lg font-semibold text-brand-900">
            Location
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="campus" className={labelClass}>
                Campus
              </label>
              <select
                ref={campusRef}
                id="campus"
                name="campus"
                disabled={isPending}
                aria-invalid={!!formState.errors.campus}
                className={inputClass}
              >
                <option value="">Select a campus</option>
                <option value="Cal Poly SLO">Cal Poly SLO</option>
                <option value="UCLA">UCLA</option>
                <option value="UC Berkeley">UC Berkeley</option>
              </select>
              {formState.errors.campus && (
                <span className="text-sm text-accent-500">
                  {formState.errors.campus}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="address" className={labelClass}>
                Address
              </label>
              <input
                ref={addressRef}
                id="address"
                name="address"
                type="text"
                placeholder="123 Main St"
                disabled={isPending}
                aria-invalid={!!formState.errors.address}
                className={inputClass}
              />
              {formState.errors.address && (
                <span className="text-sm text-accent-500">
                  {formState.errors.address}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <input
                ref={cityRef}
                id="city"
                name="city"
                type="text"
                placeholder="San Luis Obispo"
                disabled={isPending}
                aria-invalid={!!formState.errors.city}
                className={inputClass}
              />
              {formState.errors.city && (
                <span className="text-sm text-accent-500">
                  {formState.errors.city}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <input
                ref={stateRef}
                id="state"
                name="state"
                type="text"
                placeholder="CA"
                disabled={isPending}
                aria-invalid={!!formState.errors.state}
                className={inputClass}
              />
              {formState.errors.state && (
                <span className="text-sm text-accent-500">
                  {formState.errors.state}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="zipCode" className={labelClass}>
                Zip Code
              </label>
              <input
                ref={zipCodeRef}
                id="zipCode"
                name="zipCode"
                type="text"
                placeholder="93405"
                disabled={isPending}
                aria-invalid={!!formState.errors.zipCode}
                className={inputClass}
              />
              {formState.errors.zipCode && (
                <span className="text-sm text-accent-500">
                  {formState.errors.zipCode}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="distanceToCampus" className={labelClass}>
                Distance to Campus (miles)
              </label>
              <input
                ref={distanceToCampusRef}
                id="distanceToCampus"
                name="distanceToCampus"
                type="number"
                step="0.1"
                min="0"
                placeholder="0.5"
                disabled={isPending}
                aria-invalid={!!formState.errors.distanceToCampus}
                className={inputClass}
              />
              {formState.errors.distanceToCampus && (
                <span className="text-sm text-accent-500">
                  {formState.errors.distanceToCampus}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        {/* Property Details */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">
            Property Details
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="type" className={labelClass}>
                Property Type
              </label>
              <select
                id="type"
                name="type"
                disabled={isPending}
                className={inputClass}
              >
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="studio">Studio</option>
                <option value="room">Room</option>
                <option value="condo">Condo</option>
              </select>
            </div>
            <div className={fieldClass}>
              <label htmlFor="squareFootage" className={labelClass}>
                Square Footage
              </label>
              <input
                ref={squareFootageRef}
                id="squareFootage"
                name="squareFootage"
                type="number"
                min="1"
                placeholder="850"
                disabled={isPending}
                aria-invalid={!!formState.errors.squareFootage}
                className={inputClass}
              />
              {formState.errors.squareFootage && (
                <span className="text-sm text-accent-500">
                  {formState.errors.squareFootage}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="bedrooms" className={labelClass}>
                Bedrooms
              </label>
              <input
                ref={bedroomsRef}
                id="bedrooms"
                name="bedrooms"
                type="number"
                min="0"
                placeholder="2"
                disabled={isPending}
                aria-invalid={!!formState.errors.bedrooms}
                className={inputClass}
              />
              {formState.errors.bedrooms && (
                <span className="text-sm text-accent-500">
                  {formState.errors.bedrooms}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="bathrooms" className={labelClass}>
                Bathrooms
              </label>
              <input
                ref={bathroomsRef}
                id="bathrooms"
                name="bathrooms"
                type="number"
                min="0"
                step="0.5"
                placeholder="1"
                disabled={isPending}
                aria-invalid={!!formState.errors.bathrooms}
                className={inputClass}
              />
              {formState.errors.bathrooms && (
                <span className="text-sm text-accent-500">
                  {formState.errors.bathrooms}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        {/* Pricing & Availability */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">
            Pricing &amp; Availability
          </legend>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className={fieldClass}>
              <label htmlFor="rentPerMonth" className={labelClass}>
                Rent per Month ($)
              </label>
              <input
                ref={rentPerMonthRef}
                id="rentPerMonth"
                name="rentPerMonth"
                type="number"
                min="1"
                placeholder="1800"
                disabled={isPending}
                aria-invalid={!!formState.errors.rentPerMonth}
                className={inputClass}
              />
              {formState.errors.rentPerMonth && (
                <span className="text-sm text-accent-500">
                  {formState.errors.rentPerMonth}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="depositAmount" className={labelClass}>
                Deposit Amount ($)
              </label>
              <input
                ref={depositAmountRef}
                id="depositAmount"
                name="depositAmount"
                type="number"
                min="0"
                placeholder="1800"
                disabled={isPending}
                aria-invalid={!!formState.errors.depositAmount}
                className={inputClass}
              />
              {formState.errors.depositAmount && (
                <span className="text-sm text-accent-500">
                  {formState.errors.depositAmount}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="availableFrom" className={labelClass}>
                Available From
              </label>
              <input
                ref={availableFromRef}
                id="availableFrom"
                name="availableFrom"
                type="date"
                disabled={isPending}
                aria-invalid={!!formState.errors.availableFrom}
                className={inputClass}
              />
              {formState.errors.availableFrom && (
                <span className="text-sm text-accent-500">
                  {formState.errors.availableFrom}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="leaseDuration" className={labelClass}>
                Lease Duration (months)
              </label>
              <input
                ref={leaseDurationRef}
                id="leaseDuration"
                name="leaseDuration"
                type="number"
                min="1"
                placeholder="12"
                disabled={isPending}
                aria-invalid={!!formState.errors.leaseDuration}
                className={inputClass}
              />
              {formState.errors.leaseDuration && (
                <span className="text-sm text-accent-500">
                  {formState.errors.leaseDuration}
                </span>
              )}
            </div>
            <div className={fieldClass}>
              <label htmlFor="utilitiesIncluded" className={labelClass}>
                Utilities Included
              </label>
              <select
                id="utilitiesIncluded"
                name="utilitiesIncluded"
                disabled={isPending}
                className={inputClass}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>
        </fieldset>

        {/* Amenities */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">
            Amenities
          </legend>
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
              <label
                key={name}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-brand-200 bg-white px-3 py-2 text-sm text-brand-700 transition hover:border-brand-400 hover:bg-brand-50"
              >
                <input
                  type="checkbox"
                  name={name}
                  disabled={isPending}
                  className="h-4 w-4 shrink-0 accent-brand-700"
                />
                {label}
              </label>
            ))}
          </div>
        </fieldset>

        {/* Images */}
        <fieldset className={sectionClass}>
          <legend className="mb-4 text-lg font-semibold text-brand-900">
            Photos{" "}
            <span className="text-sm font-normal text-brand-500">
              (up to 10)
            </span>
          </legend>
          <div className={fieldClass}>
            <label htmlFor={fileInputId} className={labelClass}>
              Choose images to upload
            </label>
            <input
              ref={imagesRef}
              id={fileInputId}
              name="images"
              type="file"
              accept=".png,.jpg,.jpeg"
              multiple
              disabled={isPending}
              aria-invalid={!!formState.errors.images}
              className="w-full rounded-lg border border-brand-300 bg-brand-100 px-3 py-2 text-brand-900 file:mr-3 file:rounded file:border-0 file:bg-brand-700 file:px-3 file:py-1 file:text-sm file:text-white file:cursor-pointer"
              onChange={async (e) => {
                const files = Array.from(e.target.files ?? []).slice(0, 10);
                const previews = await Promise.all(files.map(readAsDataURL));
                setImagePreviews(previews);
              }}
            />
            {formState.errors.images && (
              <span className="text-sm text-accent-500">
                {formState.errors.images}
              </span>
            )}
          </div>
          {imagePreviews.length > 0 && (
            <div
              className="mt-4 flex flex-wrap gap-3"
              aria-label="Image previews"
            >
              {imagePreviews.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="h-24 w-24 rounded-lg object-cover border border-brand-300"
                />
              ))}
            </div>
          )}
        </fieldset>

        <div aria-live="polite">
          {formState.apiError && (
            <p className="rounded-lg border border-accent-300 bg-accent-50 px-4 py-3 text-sm text-accent-600">
              {formState.apiError}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-brand-900 px-4 py-3 font-medium text-white transition hover:bg-brand-800 disabled:opacity-50 md:w-auto md:self-start"
        >
          {isPending ? "Submitting…" : "Submit Listing"}
        </button>
      </form>
    </div>
  );
}
