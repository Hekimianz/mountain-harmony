import { useNavigate } from "react-router-dom";
import styles from "./css/CartBtn.module.css";
function CartBtn() {
  const navigate = useNavigate();
  const url = window.location.pathname;

  return url !== "/cart" ? (
    <div onClick={() => navigate("/cart")} className={styles.cartBtn}>
      <span className="material-symbols-outlined">shopping_cart</span>
    </div>
  ) : null;
}

export default CartBtn;
