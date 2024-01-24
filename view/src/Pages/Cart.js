// Cart.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./css/Cart.module.css";
import CartItem from "../components/CartItem";
import uuid4 from "uuid4";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [checkedOut, setCheckedOut] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      const fetchData = async () => {
        const response = await fetch(
          "https://mountain-harmony-api.onrender.com/user/cart",
          {
            credentials: "include",
          }
        );
        const data = await response.json();
        console.log(data);
        setCart(data);
      };
      fetchData();
    } else {
      console.log("is not logged");
      navigate("/");
    }
  }, [navigate]);

  let total = 0;

  const handleUpdateCart = async () => {
    const updatedResponse = await fetch(
      "https://mountain-harmony-api.onrender.com/user/cart",
      {
        credentials: "include",
      }
    );
    const updatedData = await updatedResponse.json();
    setCart(updatedData);
  };

  const items = cart.map((item) => {
    total += parseFloat(item.price.replace("$", "")) * item.quantity;
    return (
      <CartItem
        image={item.image_url}
        name={item.productname}
        quantity={item.quantity}
        total={parseFloat(item.price.replace("$", "")) * item.quantity}
        key={uuid4()}
        id={item.productid}
        onDelete={() => handleDelete(item.productid)}
        onUpdateCart={handleUpdateCart} // Pass the callback function
      />
    );
  });

  const handleDelete = async (productId) => {
    const response = await fetch(
      "https://mountain-harmony-api.onrender.com/user/cart",
      {
        credentials: "include",
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
        }),
      }
    );

    const data = await response.json();
    console.log(data);

    // Update cart after deletion
    handleUpdateCart();
  };

  async function checkout() {
    await fetch("https://mountain-harmony-api.onrender.com/user/checkout", {
      method: "POST",
      credentials: "include",
    });
    handleUpdateCart();
    setCheckedOut(true);
  }

  return (
    <div id={styles.cartMainCont}>
      {!checkedOut ? (
        <div id={styles.cartInnerCont}>
          <h1 id={styles.cartTitle}>Cart</h1>
          {items.length < 1 ? (
            <p id={styles.emptyCart}>
              Add items to your cart from our <Link to={"/shop"}>shop</Link>!
            </p>
          ) : (
            items
          )}
          <span id={styles.cartTotal}>Total: ${total.toFixed(2)}</span>
          <button
            onClick={() => checkout()}
            className={
              items.length >= 1
                ? styles.checkoutBtn
                : styles.checkoutBtnInactive
            }
          >
            Checkout
          </button>
        </div>
      ) : null}
      {checkedOut ? (
        <div id={styles.afterCheckoutCont}>
          <p id={styles.afterCheckoutText}>
            Thank you for choosing Mountain Harmony as your preferred online tea
            shop. <br />
            <br />
            Our team is now diligently preparing your order, ensuring it meets
            the utmost quality and craftsmanship.
            <br />
            <br /> As we embark on this journey to bring the tranquility of
            mountainous tea plantations to your cup, we sincerely appreciate
            your trust and look forward to providing you with a delightful tea
            experience.
            <br />
            <br />
            <span
              className={"material-symbols-outlined " + styles.closeText}
              onClick={() => {
                navigate("/profile");
                setCheckedOut(false);
              }}
            >
              close
            </span>
          </p>
        </div>
      ) : null}
    </div>
  );
}

export default Cart;
