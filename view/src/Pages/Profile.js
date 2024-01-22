import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import PastOrder from "../components/PastOrder";
import styles from "./css/Profile.module.css";

function Profile({ isLogged }) {
  const navigate = useNavigate();
  const name = "Aram Hekimian";
  const email = "aramhek121@gmail.com";
  const testProducts1 = [
    {
      name: "Earl Grey Classic",
      price: "$12.50",
      image: "https://i.imgur.com/xRNuqz9.png",
      quantity: 2,
    },
    {
      name: "Himalayan Green Bliss",
      price: "$15.99",
      image: "https://i.imgur.com/vw3hKln.png",
      quantity: 1,
    },
  ];
  const testProducts2 = [
    {
      name: "	Moroccan Mint Medley",
      price: "$14.20",
      image: "https://i.imgur.com/qGXMp1F.png",
      quantity: 1,
    },
    {
      name: "Jasmine Pearl Delight",
      price: "$18.75",
      image: "https://i.imgur.com/F62J31v.png",
      quantity: 1,
    },
    {
      name: "Himalayan Green Bliss",
      price: "$15.99",
      image: "https://i.imgur.com/vw3hKln.png",
      quantity: 2,
    },
  ];
  useEffect(() => {
    if (!isLogged) {
      navigate("/register");
    }
  }, [isLogged, navigate]);

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/user/profile", {
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div id={styles.profileMainCont}>
      <div id={styles.profileInnerCont}>
        <h1 id={styles.usernameTitle}>Username</h1>
        <div id={styles.accntInfoCont}>
          <span className={styles.accntInfo} id={styles.name}>
            Name: {name}
          </span>
          <span className={styles.accntInfo} id={styles.email}>
            Email: {email}
          </span>
        </div>
        <div id={styles.pastOrdersCont}>
          <h2 id={styles.pastOrdersTitle}>Past Orders</h2>
          <PastOrder date={"11/01/24"} products={testProducts1} />
          <PastOrder date={"04/01/24"} products={testProducts2} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
