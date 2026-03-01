import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useRef } from "react";
import { Link } from "react-router";
import { NavLinks } from "./NavLinks";

export function NavBar() {
  const [isActive, setActive] = useState<Boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        console.log("hi");
        setActive(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <>
      <nav className="fixed top-0 left-0 w-full h-16 z-50">
        <div className="bg-gray-400/50 flex items-center justify-between p-2 fixed w-screen ">
          <div className="text-fluid">
            <Link to={"/"}>PolyHousing</Link>
          </div>

          <div className="flex gap-2">
            <ul className="hidden md:flex gap-3 items-center ">
              <NavLinks />
            </ul>

            <div className="relative md:hidden">
              <button
                onClick={() => setActive(!isActive)}
                className="border-2 pl-2 pr-2 pt-1 pb-1 rounded-lg"
              >
                <FontAwesomeIcon className="fa-1x" icon={faBars} />
              </button>
              {isActive && (
                <div ref={wrapperRef} className="border absolute right-0 mt-2 ">
                  <ul className="min-w-max p-4 flex flex-col items-center ">
                    <NavLinks />
                  </ul>
                </div>
              )}
            </div>
            <button>
              <FontAwesomeIcon className="fa-2x" icon={faMoon} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
