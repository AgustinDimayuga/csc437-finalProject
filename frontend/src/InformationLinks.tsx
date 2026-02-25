import { faCow } from "@fortawesome/free-solid-svg-icons";
import { infoCard } from "./infocard.interface";
import { InfoCards } from "./InfoCards";
import { MoreInformation } from "./MoreInformation";

const INFOCARDINFORMATION: infoCard[] = [
  {
    heading: "Rent a Home ",
    infoText:
      "Search for homes that are exclusively looking for college students. No need for the hassle of worring if they are accepting college students or not ",
    icon: faCow,
  },
  {
    heading: "List a home",
    infoText:
      "Any licensed Real Estate agent can list a home. Simply upload information, photos and students can quickly and easily message you. Get you house rented within days ",
    icon: faCow,
  },
  {
    heading: "Campus Partners",
    infoText:
      "Join our 200+ Campus Partner to improve quality of life for students regarding their off campus housing. Inform students about how to be good renter and avoid scams!",
    icon: faCow,
  },
];
export function InformationLinks() {
  return (
    <MoreInformation className="bg-taupe-700">
      {INFOCARDINFORMATION.map((info) => (
        <InfoCards
          key={info.heading}
          heading={info.heading}
          infoText={info.infoText}
          icon={info.icon}
        />
      ))}
    </MoreInformation>
  );
}
