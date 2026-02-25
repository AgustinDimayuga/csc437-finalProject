import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import { SHARED_TEST } from "./shared/example";
import "./App.css";
import { NavBar } from "./NavBar";
import { Home } from "./Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NavBar />
      <Home />
    </>
  );
}

export default App;
