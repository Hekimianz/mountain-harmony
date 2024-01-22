import styles from "./css/ProductCard.module.css";

function ProductCard({ name, image, cost }) {
  return (
    <div className={styles.productCardMainCont}>
      <h2 className={styles.productName}>{name}</h2>
      <img className={styles.productImg} src={`${image}`} alt="product image" />
      <div className={styles.productInfoCont}>
        <span className={"material-symbols-outlined " + styles.productInfoBtn}>
          info
        </span>
        <span className={styles.productPrice}>{cost}</span>
        <span
          className={"material-symbols-outlined " + styles.productAddCartBtn}
        >
          add_shopping_cart
        </span>
      </div>
    </div>
  );
}

export default ProductCard;
