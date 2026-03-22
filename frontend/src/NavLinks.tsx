import { Link, useLocation } from "react-router";

export interface NavLinkItem {
  label: string;
  to: string;
}

export const NAVLINKS: NavLinkItem[] = [
  { label: "Home", to: "/" },
  { label: "Browse Homes", to: "/HomeListings" },
  { label: "List a Home", to: "/AddListing" },
  { label: "Settings", to: "/settings" },
  { label: "Contact Us", to: "/contact" },
];

interface NavLinksProps {
  authToken: string;
  userName: string;
}

export function NavLinks({ authToken, userName }: NavLinksProps) {
  const location = useLocation();

  return (
    <>
      {NAVLINKS.map((link) => {
        if (location.pathname === "/" && link.to === "/") {
          return null;
        }

        const label =
          link.to === "/settings"
            ? authToken
              ? userName
              : "Account"
            : link.label;

        return (
          <li key={link.to}>
            <Link to={link.to}>{label}</Link>
          </li>
        );
      })}
    </>
  );
}
