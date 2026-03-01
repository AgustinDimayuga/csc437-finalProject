import { SHARED_TEST } from "./shared/example";
import "./App.css";
import { Home } from "./Home";
import { Route, Routes } from "react-router";
import { MainLayout } from "./MainLayout";
import { SettingsPage } from "./SettingsPage";
import { ScrollToTop } from "./ScrollUp";
import { ContactUs } from "./ContactUs";
import { HomeListings } from "./HomeListings";

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/homes" element={<HomeListings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
