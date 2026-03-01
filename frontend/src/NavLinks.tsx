import { Link } from "react-router";

export interface NavLinks {
  label: string;
  to: string;
}
export const NAVLINKS: NavLinks[] = [
  { label: "Browse Homes", to: "/HomeListings" },
  { label: "List a Home", to: "#x" },
  { label: "Settings", to: "/settings" },
  { label: "Contact Us", to: "/contact" },
];
export function NavLinks() {
  return (
    <>
      {NAVLINKS.map((link) => (
        <li key={link.to}>
          <Link to={link.to}>{link.label}</Link>
        </li>
      ))}
    </>
  );
}
