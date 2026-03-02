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

interface NavLinksProps {
  isSignedIn: boolean;
  userName: string;
}

export function NavLinks({ isSignedIn, userName }: NavLinksProps) {
  const location = useLocation();

  return (
    <>
      {NAVLINKS.map((link) => {
        if (location.pathname === "/" && link.to === "/") {
          return null;
        }

        const label =
          link.to === "/settings"
            ? isSignedIn
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
