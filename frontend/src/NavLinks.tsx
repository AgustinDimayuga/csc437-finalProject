import { Link } from "react-router";

export interface NavLinks {
  label: string;
  to: string;
}
export const NAVLINKS: NavLinks[] = [
  { label: "Settings", to: "/settings" },
  { label: "List a Home", to: "#x" },
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
