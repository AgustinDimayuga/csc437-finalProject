import { SHARED_TEST } from "./shared/example";
import "./App.css";
import { Home } from "./Home";
import { Route, Routes } from "react-router";
import { MainLayout } from "./MainLayout";
import { SettingsPage } from "./SettingsPage";
import { ScrollToTop } from "./ScrollUp";
import { ContactUs } from "./ContactUs";
import { HomeListings } from "./HomeListings";
import { initialListings } from "./ListingsArrays";
import { useState } from "react";
import { ListingInformation } from "./ListingInformation";
import { SignInPage } from "./SignInPage";
import { ListAHome } from "./ListAHome";
import { VALID_ROUTES } from "./shared/ValidRoutes";
function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [listings, setListings] = useState(initialListings);
  const [userName, setUsername] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path={VALID_ROUTES.HOME}
          element={<MainLayout isSignedIn={isSignedIn} userName={userName} />}
        >
          <Route index element={<Home />} />
          <Route
            path={VALID_ROUTES.SETTINGS}
            element={
              isSignedIn ? (
                <SettingsPage
                  userName={userName}
                  emailAddress={emailAdress}
                  setEmailAddress={setEmailAdress}
                  setUserName={setUsername}
                />
              ) : (
                <SignInPage
                  setEmailAddress={setEmailAdress}
                  setUserName={setUsername}
                  setIsSignedIn={setSignedIn}
                />
              )
            }
          />
          <Route path={VALID_ROUTES.CONTACT} element={<ContactUs />} />
          <Route
            path={VALID_ROUTES.HOMELISTINGS}
            element={<HomeListings listings={listings} />}
          />
          <Route
            path={VALID_ROUTES.LISTING}
            element={<ListingInformation listings={listings} />}
          />
          <Route
            path={VALID_ROUTES.SIGNIN}
            element={
              <SignInPage
                setEmailAddress={setEmailAdress}
                setUserName={setUsername}
                setIsSignedIn={setSignedIn}
              />
            }
          />
          <Route
            path={VALID_ROUTES.ADDLISTING}
            element={
              isSignedIn ? (
                <ListAHome
                  userName={userName}
                  emailAddress={emailAdress}
                  setListings={setListings}
                />
              ) : (
                <SignInPage
                  setEmailAddress={setEmailAdress}
                  setUserName={setUsername}
                  setIsSignedIn={setSignedIn}
                />
              )
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
