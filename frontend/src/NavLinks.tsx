import { Link, useLocation } from "react-router";

export interface NavLinkItem {
  label: string;
  to: string;
}

export const NAVLINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Browse Homes", to: "/HomeListings" },
  { label: "List a Home", to: "#x" },
  { label: "Settings", to: "/settings" },
  { label: "Contact Us", to: "/contact" },
];

export function NavLinks() {
  const location = useLocation();

  return (
    <>
      {NAVLINKS.map((link) => {
        if (location.pathname === "/" && link.to === "/") {
          return null;
        }

        return (
          <li key={link.to}>
            <Link to={link.to}>{link.label}</Link>
          </li>
        );
      })}
    </>
  );
}
