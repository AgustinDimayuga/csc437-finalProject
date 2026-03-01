import { HousingCards } from "./HousingCards";
import { MoreInformation } from "./MoreInformation";

export function TrendingListings() {
  return (
    <MoreInformation
      heading="Trending Homes in San Luis Obispo"
      className="bg-stone-50"
    >
      <div className="rounded-4xl bg-white p-1 shadow-sm ring-1 ring-stone-200/70">
        <HousingCards />
      </div>
      <div className="rounded-4xl bg-white p-1 shadow-sm ring-1 ring-stone-200/70">
        <HousingCards />
      </div>
      <div className="rounded-4xl bg-white p-1 shadow-sm ring-1 ring-stone-200/70">
        <HousingCards />
      </div>
    </MoreInformation>
  );
}
