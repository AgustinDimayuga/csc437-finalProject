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

function App() {
  const [isSignedIn, setSignedIn] = useState(false);
  const [listings, setListings] = useState(initialListings);
  const [userName, setUsername] = useState("");
  const [emailAdress, setEmailAdress] = useState("");
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/settings"
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
          <Route path="/contact" element={<ContactUs />} />
          <Route
            path="/HomeListings"
            element={
              <HomeListings listings={listings} setListings={setListings} />
            }
          />
          <Route path="/listing/:id" element={<ListingInformation />} />
          <Route
            path="/signIn"
            element={
              <SignInPage
                setEmailAddress={setEmailAdress}
                setUserName={setUsername}
                setIsSignedIn={setSignedIn}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
