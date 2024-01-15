import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <Router>
      <TopNav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
