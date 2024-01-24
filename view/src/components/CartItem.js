import styles from "./css/CartItem.module.css";

function CartItem({
  image,
  name,
  quantity,
  total,
  id,
  onDelete,
  onUpdateCart,
}) {
  const handleDelete = async () => {
    await onDelete();
  };

  async function increaseQuantity(id) {
    await fetch(
      "https://mountain-harmony-api.onrender.com/user/cart/increase",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      }
    );
    onUpdateCart();
  }

  async function decreaseQuantity(id) {
    await fetch(
      "https://mountain-harmony-api.onrender.com/user/cart/decrease",
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: id,
        }),
      }
    );
    onUpdateCart();
  }

  return (
    <div className={styles.cartItemCont}>
      <img className={styles.cartProductImg} src={image} alt="product" />
      <h2 className={styles.cartProductName}>{name}</h2>
      <span className={styles.cartProductQuantity}>
        <span
          onClick={() => increaseQuantity(id)}
          className={
            "material-symbols-outlined " + styles.cartProductQuantArrowUp
          }
        >
          arrow_upward_alt
        </span>
        x{quantity}
        <span
          onClick={() => decreaseQuantity(id)}
          className={
            "material-symbols-outlined " +
            (quantity >= 2
              ? styles.cartProductQuantArrowDown
              : styles.cartProductQuantArrowDownInactive)
          }
        >
          arrow_downward_alt
        </span>
      </span>
      <span className={styles.cartProductPrice}>${total.toFixed(2)}</span>
      <span
        className={"material-symbols-outlined " + styles.cartDelBtn}
        onClick={handleDelete}
      >
        delete
      </span>
    </div>
  );
}

export default CartItem;
