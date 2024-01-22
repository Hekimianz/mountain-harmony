import styles from "./css/PastOrder.module.css";
function PastOrder({ date, products }) {
  const total = "$100";
  const renderProducts = products.map((product) => {
    return (
      <div className={styles.productInfoCont} key={product.name}>
        <img className={styles.productImg} alt="product" src={product.image} />
        <span className={styles.productName}>{product.name}</span>
        <span className={styles.productPrice}>{product.price}</span>
      </div>
    );
  });
  return (
    <div className={styles.pastOrderCont}>
      <span className={styles.date}>{date}</span>
      {renderProducts}
      <span className={styles.productTotal}>Total: {total}</span>
    </div>
  );
}

export default PastOrder;
