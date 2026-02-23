import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
interface NavLinks {
  label: string;
  href: string;
}
const NAVLINKS: NavLinks[] = [
  { label: "Home", href: "#x" },
  { label: "Settings", href: "#x" },
  { label: "Create Listing", href: "#x" },
  { label: "Properties", href: "#x" },
];
interface NavLinksProps {
  navLinks: NavLinks[]; // array of links
}

function NavLinks({ navLinks }: NavLinksProps) {
  return (
    <ul className="flex gap-4">
      {navLinks.map((link) => (
        <li key={link.href}>
          <a href={link.href}>{link.label}</a>
        </li>
      ))}
    </ul>
  );
}

export function NavBar() {
  return (
    <>
      <nav>
        <div className="flex items-baseline justify-between p-2">
          <div className="text-fluid">PolyHousing</div>
          <div>
            <NavLinks navLinks={NAVLINKS} />
          </div>
          <FontAwesomeIcon className="fa-2x" icon={faMoon} />
        </div>
      </nav>
    </>
  );
}
