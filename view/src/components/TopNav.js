import { useNavigate, NavLink } from "react-router-dom";
import styles from "./css/TopNav.module.css";
import logo from "../assets/logo.png";
function TopNav(props) {
  const navigate = useNavigate();
  return (
    <div id={styles.topNav}>
      <img
        onClick={() => {
          navigate("/");
        }}
        id={styles.logo}
        src={logo}
        alt="mountain harmony logo"
      />
      <span
        onClick={() => {
          props.setToggleMenu((prev) => !prev);
        }}
        className={
          "material-symbols-outlined " +
          (props.toggleMenu ? styles.activatedMenu : styles.navMenu)
        }
      >
        menu
      </span>
      {props.toggleMenu ? (
        <div id={styles.sideMenu}>
          <ul>
            <li>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  `${styles.navLink} ${
                    isPending ? styles.pending : isActive ? styles.active : ""
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive, isPending }) =>
                  `${styles.navLink} ${
                    isPending ? styles.pending : isActive ? styles.active : ""
                  }`
                }
              >
                Sign in
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                className={({ isActive, isPending }) =>
                  `${styles.navLink} ${
                    isPending ? styles.pending : isActive ? styles.active : ""
                  }`
                }
              >
                Shop
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about-us"
                className={({ isActive, isPending }) =>
                  `${styles.navLink} ${
                    isPending ? styles.pending : isActive ? styles.active : ""
                  }`
                }
              >
                About Us
              </NavLink>
            </li>
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default TopNav;
