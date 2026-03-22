import "./App.css";
import { Home } from "./Home";
import { Route, Routes } from "react-router";
import { MainLayout } from "./MainLayout";
import { SettingsPage } from "./SettingsPage";
import { ScrollToTop } from "./ScrollUp";
import { ContactUs } from "./ContactUs";
import { HomeListings } from "./HomeListings";
import { useState } from "react";
import { ListingInformation } from "./ListingInformation";
import { SignInPage } from "./SignInPage";
import { ListAHome } from "./ListAHome";
import { VALID_ROUTES } from "./shared/ValidRoutes";
import { ProtectedRoute } from "./ProtectedRoute";
function App() {
  const [authToken, setAuthToken] = useState("");
  const [emailAddress, setEmailAdress] = useState("");
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route
          path={VALID_ROUTES.HOME}
          element={
            <MainLayout authToken={authToken} emailAddress={emailAddress} />
          }
        >
          <Route
            index
            element={
              <ProtectedRoute authToken={authToken}>
                <Home authToken={authToken} />
              </ProtectedRoute>
            }
          />
          <Route
            path={VALID_ROUTES.SETTINGS}
            element={
              <ProtectedRoute authToken={authToken}>
                <SettingsPage authToken={authToken} emailAddress={emailAddress} />
              </ProtectedRoute>
            }
          />
          <Route path={VALID_ROUTES.CONTACT} element={<ContactUs />} />
          <Route
            path={VALID_ROUTES.HOMELISTINGS}
            element={
              <ProtectedRoute authToken={authToken}>
                <HomeListings authToken={authToken} />
              </ProtectedRoute>
            }
          />
          <Route
            path={VALID_ROUTES.LISTING}
            element={
              <ProtectedRoute authToken={authToken}>
                <ListingInformation authToken={authToken} />
              </ProtectedRoute>
            }
          />
          <Route
            path={VALID_ROUTES.SIGNIN}
            element={
              <SignInPage
                setEmailAddress={setEmailAdress}
                setAuthToken={setAuthToken}
              />
            }
          />
          <Route
            path={VALID_ROUTES.REGISTER}
            element={
              <SignInPage
                setEmailAddress={setEmailAdress}
                setAuthToken={setAuthToken}
                isRegistering
              />
            }
          />
          <Route
            path={VALID_ROUTES.ADDLISTING}
            element={
              <ProtectedRoute authToken={authToken}>
                <ListAHome authToken={authToken} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
