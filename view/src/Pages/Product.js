import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./css/Product.module.css";

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const fetchData = async () => {
    const response = await fetch(`http://localhost:4000/products/${id}`);
    const data = await response.json();
    setProduct(data);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div id={styles.productMainCont}>
      <div id={styles.productInnerCont}>
        <h1 id={styles.productTitle}>{product.name}</h1>
        <div id={styles.productInfoCont}>
          <img id={styles.productImg} src={product.image_url} alt="product" />
          <p id={styles.productDesc}>{product.description}</p>
        </div>
        <div id={styles.productBtnsCont}>
          <span id={styles.productPrice}>{product.price}</span>
          <span
            className={"material-symbols-outlined " + styles.productAddCartBtn}
          >
            add_shopping_cart
          </span>
        </div>
      </div>
    </div>
  );
}

export default Product;
