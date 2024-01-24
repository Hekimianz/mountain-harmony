import { useState, useEffect } from "react";
import styles from "./css/Shop.module.css";
import ProductCard from "../components/ProductCard";
function Shop({ isLogged }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [merch, setMerch] = useState([]);
  const fetchProducts = async (category, setter) => {
    const response = await fetch(
      `https://mountain-harmony-api.onrender.com/products/?category=${category}`
    );
    const data = await response.json();
    setter(data);
  };
  useEffect(() => {
    fetchProducts("featured", setFeaturedProducts);
    fetchProducts("trending", setTrendingProducts);
    fetchProducts("new", setNewProducts);
    fetchProducts("accessories", setAccessories);
    fetchProducts("merch", setMerch);
  }, []);

  const renderProducts = (categoryState) => {
    return categoryState.map((product) => {
      return (
        <ProductCard
          name={product.name}
          cost={product.price}
          image={product.image_url}
          id={product.id}
          key={product.id}
          isLogged={isLogged}
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
