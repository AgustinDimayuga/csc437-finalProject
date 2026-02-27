import { SHARED_TEST } from "./shared/example";
import "./App.css";
import { NavBar } from "./NavBar";
import { Home } from "./Home";
import { Route, Routes } from "react-router";
import { MainLayout } from "./MainLayout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
