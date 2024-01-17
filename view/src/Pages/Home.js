import { useNavigate } from "react-router-dom";
import shopFront from "../assets/shopFront.png";
import styles from "./css/Home.module.css";

function Home({ isLogged }) {
  const navigate = useNavigate();
  return (
    <div id={styles.welcomeCont}>
      <img className={styles.contImg} src={shopFront} alt="mountain range" />
      <div className={styles.welcomeText}>
        {" "}
        <p>
          Welcome to{" "}
          <span className={styles.highlightText}>Mountain Harmony</span>
          <br />
          <br />
          Discover the serenity of the mountains in every cup.
        </p>
        <button onClick={() => navigate("/shop")} className={styles.shopBtn}>
          <span>Shop Now</span>
          <svg
            width="34"
            height="34"
            viewBox="0 0 74 74"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="37"
              cy="37"
              r="35.5"
              stroke="black"
              strokeWidth="3"
            ></circle>
            <path
              d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z"
              fill="black"
            ></path>
          </svg>
        </button>
        <div id={styles.aboutCont}>
          <h2 className={styles.titleCont}>About Us</h2>
          <p className={styles.aboutText}>
            At Mountain Harmony, our journey begins in the lush tea gardens of
            the world. <br />
            <br />
            We handpick the finest teas, each with its unique story, to bring
            you not just a beverage, but an experience.
            <br />
            <br />
            Our commitment to ethical sourcing and sustainability means every
            cup you savor not only tastes good but does good.
            <br />
            <br />
            Join us for a taste of harmony, where nature's best meets artisanal
            tradition.
          </p>
          <button
            onClick={() => navigate("/about-us")}
            className={styles.learnBtn}
          >
            Learn More
          </button>
          {!isLogged ? (
            <div className={styles.btnsCont}>
              <button
                onClick={() => navigate("/sign-in")}
                className={styles.learnBtn}
                id={styles.signInBtn}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className={styles.learnBtn}
                id={styles.registerBtn}
              >
                Register
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Home;
