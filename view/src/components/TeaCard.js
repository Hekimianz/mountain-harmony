import styles from "./css/TeaCard.module.css";
import teaImg from "../assets/test.png";
function TeaCard() {
  return (
    <div className={styles.cardCont}>
      <img className={styles.teaImg} src={teaImg} alt="tea" />
      <div className={styles.teaInfoCont}>
        <h2 className={styles.teaName}>Himalayan Green Bliss</h2>
        <div className={styles.teaPrice_BtnCont}>
          <span className={styles.teaPrice}>$15.99</span>
          <span className={"material-symbols-outlined " + styles.teaAddToCart}>
            shopping_basket
          </span>
        </div>
      </div>
    </div>
  );
}

export default TeaCard;
