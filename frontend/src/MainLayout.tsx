import { Outlet } from "react-router";
import { NavBar } from "./NavBar";
import { Footer } from "./Footer";

interface MainLayoutProps {
  authToken: string;
  emailAddress: string;
}

export function MainLayout({ authToken, emailAddress }: MainLayoutProps) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <NavBar authToken={authToken} userName={emailAddress} />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
