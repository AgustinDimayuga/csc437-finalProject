import { HousingCards } from "./HousingCards";
import { MoreInformation } from "./MoreInformation";

export function TrendingListings() {
  return (
    <MoreInformation heading="Trending Homes in San Luis Obispo">
      <HousingCards />
      <HousingCards />
      <HousingCards />
    </MoreInformation>
  );
}
