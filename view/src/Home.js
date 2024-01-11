import styles from "./css/Home.module.css";
import logo from "./assets/logo.png";
import TeaCard from "./components/TeaCard";
function Home() {
  return (
    <div className={styles.mainCont}>
      <nav id={styles.topNav}>
        <img id={styles.logo} src={logo} alt="mountain harmony logo" />
      </nav>
      <span id={styles.cart} className="material-symbols-outlined">
        shopping_bag
      </span>
      <div id={styles.teasCont}>
        <TeaCard />
        <TeaCard />
        <TeaCard />
        <TeaCard />
        <TeaCard />
        <TeaCard />
        <TeaCard />
        <TeaCard />
      </div>
    </div>
  );
}

export default Home;
