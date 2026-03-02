import { Outlet } from "react-router";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  isSignedIn: boolean;
  userName: string;
}

export function MainLayout({ isSignedIn, userName }: MainLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar isSignedIn={isSignedIn} userName={userName} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
