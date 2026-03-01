export function HomeFilters() {
  return (
    <>
      <form className="w-full max-w-5xl rounded-2xl border border-amber-100 bg-white/90 p-6 shadow-sm backdrop-blur sm:p-8">
        <fieldset className="space-y-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="searchText"
              className="text-sm font-semibold uppercase tracking-wide text-stone-600"
            >
              Search
            </label>
            <input
              type="text"
              id="searchText"
              className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-4 text-base text-stone-900 placeholder:text-stone-400 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100"
              placeholder="Neighborhood, street, or listing"
            ></input>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="price-range"
                className="text-sm font-semibold uppercase tracking-wide text-stone-600"
              >
                Price
              </label>
              <select
                id="price-range"
                className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-3 text-base text-stone-900 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100"
              >
                <option value="">Any</option>
                <option value="0-1000">$0 - $1,000</option>
                <option value="1000-2000">$1,000 - $2,000</option>
                <option value="2000+">$2,000+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="beds"
                className="text-sm font-semibold uppercase tracking-wide text-stone-600"
              >
                Beds
              </label>
              <select
                id="beds"
                className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-3 text-base text-stone-900 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100"
              >
                <option value="">Any</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="baths"
                className="text-sm font-semibold uppercase tracking-wide text-stone-600"
              >
                Baths
              </label>
              <select
                id="baths"
                className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-3 text-base text-stone-900 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100"
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
                className="text-sm font-semibold uppercase tracking-wide text-stone-600"
              >
                Sqft
              </label>
              <select
                id="sqft"
                className="h-11 rounded-xl border border-stone-300 bg-stone-50 px-3 text-base text-stone-900 outline-none transition focus:border-amber-600 focus:bg-white focus:ring-2 focus:ring-amber-100"
              >
                <option value="">Any</option>
                <option value="0-1000">0 - 1,000</option>
                <option value="1000-2000">1,000 - 2,000</option>
                <option value="2000+">2,000+</option>
              </select>
            </div>
          </div>
        </fieldset>
      </form>
    </>
  );
}
