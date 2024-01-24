import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopNav from "./components/TopNav";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Register from "./Pages/Register";
import Shop from "./Pages/Shop";
import SignIn from "./Pages/SignIn";
import Profile from "./Pages/Profile";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import CartBtn from "./components/CartBtn";

function App() {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [logged, setLogged] = useState(false);

  return (
    <Router>
      <TopNav
        toggleMenu={toggleMenu}
        setToggleMenu={setToggleMenu}
        isLogged={logged}
        setLogged={setLogged}
      />
      {logged ? <CartBtn /> : null}
      <Routes>
        <Route path="/" element={<Home isLogged={logged} />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/register" element={<Register isLogged={logged} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop isLogged={logged} />} />
        <Route path="/sign-in" element={<SignIn isLogged={logged} />} />
        <Route path="/profile" element={<Profile isLogged={logged} />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
