import { ChangeEvent, useState } from "react";
import { NavBar } from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCow } from "@fortawesome/free-solid-svg-icons";
import { SearchInput } from "./SearchInput";
import { Link } from "react-router";
interface heroProps {
  heading: string;
  subHeading: string;
}

export function Hero({ heading, subHeading }: heroProps) {
  const [searchText, setText] = useState("");
  const [showColleges, setColleges] = useState(false);
  return (
    <>
      {/* Fix hard coded values like mt 25vh gap-10 later*/}
      <div className="flex flex-col items-center flex-1 min-h-screen justify-center p-4 gap-10">
        <div className="flex flex-col items-center">
          <span className="text-fluidH1 font-bold">{heading}</span>
          <h1 className="text-fluidH2 text-gray-600">{subHeading}</h1>
        </div>
        {/* Implement Search Input Later
        <SearchInput
          searchText={searchText}
          onSearchTextChange={setText}
          showColleges={showColleges}
          setColleges={setColleges}
        />
      */}
        <Link to="/HomeListings">
          <button className="bg-amber-700 border rounded-2xl p-2">
            Go home
          </button>
        </Link>
      </div>
    </>
  );
}
