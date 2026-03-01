import { useParams } from "react-router";

export function ListingInformation() {
  const { id } = useParams(); // destructure the specific param

  return (
    <div className="container-information">
      <h1>Listing information works {id}</h1>
    </div>
  );
}
