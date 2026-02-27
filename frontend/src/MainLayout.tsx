import { Outlet } from "react-router";
import { NavBar } from "./NavBar";

export function MainLayout() {
  return (
    <div>
      <NavBar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
