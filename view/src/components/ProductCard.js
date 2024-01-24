import { useNavigate } from "react-router-dom";
import styles from "./css/ProductCard.module.css";

function ProductCard({ name, image, cost, id, isLogged }) {
  const navigate = useNavigate();
  const addToCart = async () => {
    await fetch("http://localhost:4000/user/cart", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        quantity: 1,
        productId: id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
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
        {isLogged ? (
          <span
            className={"material-symbols-outlined " + styles.productAddCartBtn}
            onClick={() => {
              addToCart();
            }}
          >
            add_shopping_cart
          </span>
        ) : null}
      </div>
    </div>
  );
}

export default ProductCard;
