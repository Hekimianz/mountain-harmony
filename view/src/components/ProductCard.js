import { useNavigate } from "react-router-dom";
import styles from "./css/ProductCard.module.css";

function ProductCard({ name, image, cost, id }) {
  const navigate = useNavigate();
  return (
    <div className={styles.productCardMainCont}>
      <h2 className={styles.productName}>{name}</h2>
      <img className={styles.productImg} src={`${image}`} alt="product" />
      <div className={styles.productInfoCont}>
        <span
          className={"material-symbols-outlined " + styles.productInfoBtn}
          onClick={() => navigate(`/product/${id}`)}
        >
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
