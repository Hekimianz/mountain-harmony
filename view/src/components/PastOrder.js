import styles from "./css/PastOrder.module.css";
function PastOrder({ date, products, id }) {
  let total = 0;
  const renderProducts = products.map((product) => {
    total =
      total + parseFloat(product.cost.replace("$", "")) * product.quantity;
    return (
      <div className={styles.productInfoCont} key={product.name}>
        <img className={styles.productImg} alt="product" src={product.image} />
        <span className={styles.productName}>
          {product.name}
          <br />x{product.quantity}
        </span>
        <span className={styles.productPrice}>{product.cost}</span>
      </div>
    );
  });
  return (
    <div className={styles.pastOrderCont}>
      <span className={styles.date}>{date}</span>
      {renderProducts}
      <span className={styles.productTotal}>Total: ${total}</span>
    </div>
  );
}

export default PastOrder;
