import { useEffect, useRef, useState } from "react";
import { DropDown } from "./DropDown";
type College = {
  id: number;
  name: string;
};
const COLLEGES: College[] = [
  { id: 1, name: "Harvard University" },
  { id: 2, name: "Stanford University" },
  { id: 3, name: "Massachusetts Institute of Technology" },
  { id: 4, name: "University of California, Berkeley" },
  { id: 5, name: "Princeton University" },
  { id: 6, name: "Yale University" },
  { id: 7, name: "Columbia University" },
  { id: 8, name: "California Institute of Technology" },
  { id: 9, name: "University of Chicago" },
  { id: 10, name: "Duke University" },
  { id: 11, name: "University of Pennsylvania" },
  { id: 12, name: "Johns Hopkins University" },
  { id: 13, name: "Northwestern University" },
  { id: 14, name: "Cornell University" },
  { id: 15, name: "University of Michigan" },
];
interface searchTextProps {
  searchText: string;
  onSearchTextChange: React.Dispatch<React.SetStateAction<string>>;
  showColleges: boolean;
  setColleges: React.Dispatch<React.SetStateAction<boolean>>;
}
export function SearchInput({
  searchText,
  onSearchTextChange,
  showColleges,
  setColleges,
}: searchTextProps) {
  {
    /* Fix hard coded values like mt 25vh gap-10 later*/
  }
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        console.log("hi");
        setColleges(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div ref={wrapperRef} className="relative flex w-full max-w-3xl">
      <input
        type="text"
        className="flex-1 border-2 border-black p-2 rounded-lg"
        placeholder="Search Campus"
        value={searchText}
        onChange={(e) => onSearchTextChange(e.currentTarget.value)}
        onFocus={() => setColleges(true)}
      />
      {showColleges && (
        <div className="absolute top-full border-b border-r border-l w-full p-2 rounded-lg">
          {/* if the input text is empty show nothing if it has something show the relevant stuff*/}
          <DropDown
            searchText={searchText}
            getSearchValue={(COLLEGES) => COLLEGES.name}
            classNameDiv="border-b"
            arraySelection={COLLEGES}
          />
        </div>
      )}
    </div>
  );
}
