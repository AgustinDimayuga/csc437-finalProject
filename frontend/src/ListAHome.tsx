import { Listing } from "./Listing.interface";
interface LisstAHome {
  userName: string;
  emailAddress: string;
  setListings: React.Dispatch<React.SetStateAction<Listing[]>>;
}
export function ListAHome({ userName, emailAddress, setListings }: LisstAHome) {
  return (
    <>
      <div className="container-information">
        {userName}
        {emailAddress}
      </div>
    </>
  );
}
