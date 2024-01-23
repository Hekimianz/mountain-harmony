import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Cart.module.css";
import CartItem from "../components/CartItem";
import uuid4 from "uuid4";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      const fetchData = async () => {
        const response = await fetch("http://localhost:4000/user/cart", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        setCart(data);
      };
      fetchData();
    } else {
      console.log("is not logged");
      navigate("/");
    }
  }, []);

  let total = 0;

  const items = cart.map((item) => {
    total += parseFloat(item.price.replace("$", "")) * item.quantity;
    return (
      <CartItem
        image={item.image_url}
        name={item.productname}
        quantity={item.quantity}
        total={parseFloat(item.price.replace("$", "")) * item.quantity}
        key={uuid4()}
      />
    );
  });

  return (
    <div id={styles.cartMainCont}>
      <div id={styles.cartInnerCont}>
        <h1 id={styles.cartTitle}>Cart</h1>
        {items}
        <span id={styles.cartTotal}>Total: ${total}</span>
      </div>
    </div>
  );
}

export default Cart;
