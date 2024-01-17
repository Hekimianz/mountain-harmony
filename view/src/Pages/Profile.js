import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./css/Profile.module.css";

function Profile({ isLogged }) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogged) {
      navigate("/register");
    }
  });
  return (
    <div id={styles.profileMainCont}>
      <div id={styles.profileInnerCont}></div>
    </div>
  );
}

export default Profile;
