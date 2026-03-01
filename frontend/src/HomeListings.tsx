import { HomeFilters } from "./HomeFilters";
import { HousingCards } from "./HousingCards";

export function HomeListings() {
  return (
    <>
      <div className="container-information flex flex-col items-center gap-4">
        <HomeFilters />
        <HousingCards />
      </div>
    </>
  );
}
