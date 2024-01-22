import { useState, useEffect } from "react";
import styles from "./css/Shop.module.css";
import ProductCard from "../components/ProductCard";
function Shop() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [merch, setMerch] = useState([]);
  const fetchProducts = async (category, setter) => {
    const response = await fetch(
      `http://localhost:4000/products/?category=${category}`
    );
    const data = await response.json();
    setter(data);
  };
  useEffect(() => {
    fetchProducts("featured", setFeaturedProducts);
    fetchProducts("featured", setTrendingProducts);
    fetchProducts("featured", setNewProducts);
    fetchProducts("featured", setAccessories);
    fetchProducts("featured", setMerch);
  }, []);

  const renderProducts = (categoryState) => {
    return categoryState.map((product) => {
      return (
        <ProductCard
          name={product.name}
          cost={product.price}
          image={product.image_url}
          key={product.id}
        />
      );
    });
  };

  return (
    <div id={styles.shopMainCont}>
      <div id={styles.shopInnerCont}>
        <h1 id={styles.shopTitle}>Shop</h1>
        <h2 className={styles.shelfTitle}>Featured</h2>
        <div className={styles.shopShelf}>
          {renderProducts(featuredProducts)}
        </div>
        <h2 className={styles.shelfTitle}>Trending</h2>
        <div className={styles.shopShelf}>
          {renderProducts(trendingProducts)}
        </div>
        <h2 className={styles.shelfTitle}>New Products</h2>
        <div className={styles.shopShelf}>{renderProducts(newProducts)}</div>
        <h2 className={styles.shelfTitle}>Accessories</h2>
        <div className={styles.shopShelf}>{renderProducts(accessories)}</div>
        <h2 className={styles.shelfTitle}>Merch</h2>
        <div className={styles.shopShelf}>{renderProducts(merch)}</div>
      </div>
    </div>
  );
}

export default Shop;