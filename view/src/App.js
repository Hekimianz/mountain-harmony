import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import SignIn from "./Pages/SignIn";
function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  return (
    <Router>
      <TopNav toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/register" element={<Register />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
