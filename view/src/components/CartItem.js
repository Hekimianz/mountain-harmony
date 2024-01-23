import styles from "./css/CartItem.module.css";
function CartItem({ image, name, quantity, total }) {
  return (
    <div className={styles.cartItemCont}>
      <img className={styles.cartProductImg} src={image} alt="product" />
      <h2 className={styles.cartProductName}>{name}</h2>
      <span className={styles.cartProductQuantity}>x{quantity}</span>
      <span className={styles.cartProductPrice}>${total.toFixed(2)}</span>
    </div>
  );
}

export default CartItem;
