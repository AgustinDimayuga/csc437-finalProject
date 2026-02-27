import { ChangeEvent, useState } from "react";
import { NavBar } from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faCow } from "@fortawesome/free-solid-svg-icons";
import { Hero } from "./Hero";
import { TrendingListings } from "./TrendingListings";
import { InformationLinks } from "./InformationLinks";
import { Footer } from "./Footer";

export function Home() {
  return (
    <>
      <div className="flex flex-col ">
        <Hero
          heading="Student Friendly Options"
          subHeading="Find Your Next Off-Campus Destination"
        />
        <InformationLinks />
        <TrendingListings />
        <Footer />
      </div>
    </>
  );
}
