import { FilterData } from "./HomeListings";

interface HomeFiltersProps {
  data: FilterData;
  submitForm: (payload: FormData) => void;
}
export function HomeFilters({ data, submitForm }: HomeFiltersProps) {
  return (
    <>
      <form
        action={submitForm}
        className="w-full max-w-5xl rounded-2xl border border-brand-200 bg-brand-100/90 p-6 shadow-sm backdrop-blur sm:p-8"
      >
        <fieldset className="space-y-6">
          <div className="flex flex-col gap-2">
            {/* Remove this when search functionality works
            <label

              htmlFor="searchText"
              className="text-sm font-semibold uppercase tracking-wide text-brand-600"
            >
              Search
            </label>
            <input
              type="text"
              id="searchText"
              className="h-11 rounded-xl border border-brand-300 bg-brand-50 px-4 text-base text-brand-900 placeholder:text-brand-400 outline-none transition focus:border-brand-700 focus:bg-brand-100 focus:ring-2 focus:ring-brand-200"
              placeholder="Neighborhood, street, or listing"
            ></input>

          */}
            <label
              htmlFor="campus"
              className="text-sm font-semibold uppercase tracking-wide text-brand-600"
            >
              Campus
            </label>

            <select
              id="campus"
              className="h-11 rounded-xl border border-brand-300 bg-brand-50 px-3 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:bg-brand-100 focus:ring-2 focus:ring-brand-200"
              name="campus"
            >
              <option value="">Any</option>
              <option value="Cal Poly SLO">Cal Poly Slo</option>
              <option value="UCLA">UCLA</option>
              <option value="UC Berkeley">Berkley</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="price-range"
                className="text-sm font-semibold uppercase tracking-wide text-brand-600"
              >
                Price
              </label>
              <select
                id="price-range"
                className="h-11 rounded-xl border border-brand-300 bg-brand-50 px-3 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:bg-brand-100 focus:ring-2 focus:ring-brand-200"
                name="price"
              >
                <option value="">Any</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000-3000">$2,000 - $3,000 </option>
                <option value="3000-4000">$3,000 - $4,000 </option>
                <option value="4000+">$4,000+ </option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="beds"
                className="text-sm font-semibold uppercase tracking-wide text-brand-600"
              >
                Beds
              </label>
              <select
                id="beds"
                className="h-11 rounded-xl border border-brand-300 bg-brand-50 px-3 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:bg-brand-100 focus:ring-2 focus:ring-brand-200"
                name="beds"
              >
                <option value="">Any</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="baths"
                className="text-sm font-semibold uppercase tracking-wide text-brand-600"
              >
                Baths
              </label>
              <select
                id="baths"
                className="h-11 rounded-xl border border-brand-300 bg-brand-50 px-3 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:bg-brand-100 focus:ring-2 focus:ring-brand-200"
                name="baths"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="sqft"
                className="text-sm font-semibold uppercase tracking-wide text-brand-600"
              >
                Sqft
              </label>
              <select
                id="sqft"
                className="h-11 rounded-xl border border-brand-300 bg-brand-50 px-3 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:bg-brand-100 focus:ring-2 focus:ring-brand-200"
                name="sqft"
              >
                <option value="">Any</option>
                <option value="0-1000">0 - 1,000</option>
                <option value="1000-2000">1,000 - 2,000</option>
                <option value="2000+">2,000+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="postedBy"
                className="text-sm font-semibold uppercase tracking-wide text-brand-600"
              >
                Posted By
              </label>
              <select
                id="postedBy"
                className="h-11 rounded-xl border border-brand-300 bg-brand-50 px-3 text-base text-brand-900 outline-none transition focus:border-brand-700 focus:bg-brand-100 focus:ring-2 focus:ring-brand-200"
                name="postedBy"
              >
                <option value="">Any</option>
                <option value="agent">Agent</option>
                <option value="student">Student</option>
              </select>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="rounded-lg bg-brand-900 px-4 py-2 font-medium text-white transition hover:bg-brand-800"
            >
              Apply Filters
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
