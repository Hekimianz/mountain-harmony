import { useNavigate, NavLink } from "react-router-dom";
import styles from "./css/TopNav.module.css";
import logo from "../assets/logo.png";
import { useEffect } from "react";
function TopNav(props) {
  useEffect(() => {
    if (localStorage.getItem("sessionId")) {
      props.setLogged(true);
    } else {
      props.setLogged(false);
    }
  });
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      const response = await fetch("http://localhost:4000/user/logout", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      await response.json();
      localStorage.removeItem("sessionId");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  }
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
      <div id={styles.navBarCont}>
        <ul id={styles.navBarUl}>
          <li>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                `${styles.barNavLink} ${
                  isPending
                    ? styles.barPending
                    : isActive
                    ? styles.barActive
                    : ""
                }`
              }
            >
              Home
            </NavLink>
          </li>
          {props.isLogged ? (
            <li>
              <NavLink
                to="/profile"
                className={({ isActive, isPending }) =>
                  `${styles.barNavLink} ${
                    isPending
                      ? styles.barPending
                      : isActive
                      ? styles.barActive
                      : ""
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
          ) : (
            <li>
              <NavLink
                to="/sign-in"
                className={({ isActive, isPending }) =>
                  `${styles.barNavLink} ${
                    isPending
                      ? styles.barPending
                      : isActive
                      ? styles.barActive
                      : ""
                  }`
                }
              >
                Sign in
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/shop"
              className={({ isActive, isPending }) =>
                `${styles.barNavLink} ${
                  isPending
                    ? styles.barPending
                    : isActive
                    ? styles.barActive
                    : ""
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
                `${styles.barNavLink} ${
                  isPending
                    ? styles.barPending
                    : isActive
                    ? styles.barActive
                    : ""
                }`
              }
            >
              About Us
            </NavLink>
          </li>
          {props.isLogged ? (
            <li onClick={() => handleLogout()}>Log Out</li>
          ) : null}
        </ul>
      </div>
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
          <ul id={styles.sideMenuUl}>
            <li>
              <NavLink
                onClick={() => props.setToggleMenu((prev) => !prev)}
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
            {props.isLogged ? (
              <li>
                <NavLink
                  onClick={() => props.setToggleMenu((prev) => !prev)}
                  to="/profile"
                  className={({ isActive, isPending }) =>
                    `${styles.navLink} ${
                      isPending ? styles.pending : isActive ? styles.active : ""
                    }`
                  }
                >
                  Profile
                </NavLink>
              </li>
            ) : (
              <li>
                <NavLink
                  onClick={() => props.setToggleMenu((prev) => !prev)}
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
            )}
            <li>
              <NavLink
                onClick={() => props.setToggleMenu((prev) => !prev)}
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
                onClick={() => props.setToggleMenu((prev) => !prev)}
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
            {props.isLogged ? (
              <li
                onClick={() => {
                  props.setToggleMenu((prev) => !prev);
                  handleLogout();
                }}
                id={styles.liOdd}
              >
                Log Out
              </li>
            ) : null}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export default TopNav;
