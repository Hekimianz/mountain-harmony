import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import PastOrder from "../components/PastOrder";
import styles from "./css/Profile.module.css";

function Profile({ isLogged }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogged) {
      navigate("/register");
    }
  }, [isLogged, navigate]);

  const [userData, setUserData] = useState({});
  const [pastOrders, setPastOrders] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:4000/user/profile", {
          credentials: "include",
        });
        const data = await response.json();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    const fetchPastOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/user/orders", {
          credentials: "include",
        });
        const data = await response.json();
        setPastOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
      }
    };
    fetchUserData();
    fetchPastOrders();
  }, []);

  const renderOrders = () => {
    const orders = pastOrders.map((order) => {
      return (
        <PastOrder
          date={order.order_date}
          products={order.order}
          id={order.order_id}
          key={order.order_id}
        />
      );
    });
    return orders;
  };

  return (
    <div id={styles.profileMainCont}>
      <div id={styles.profileInnerCont}>
        <h1 id={styles.usernameTitle}>{userData?.username}</h1>
        <div id={styles.accntInfoCont}>
          <span className={styles.accntInfo} id={styles.name}>
            Name: {userData?.name}
          </span>
          <span className={styles.accntInfo} id={styles.email}>
            Email: {userData?.email}
          </span>
        </div>
        <div id={styles.pastOrdersCont}>
          <h2 id={styles.pastOrdersTitle}>Past Orders</h2>
          {renderOrders()}
        </div>
      </div>
    </div>
  );
}

export default Profile;
