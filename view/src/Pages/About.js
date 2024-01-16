import { useState } from "react";
import styles from "./css/About.module.css";
import japan from "../assets/japan.png";
import mexico from "../assets/mexico.png";
import england from "../assets/england.png";
import india from "../assets/india.png";
function About() {
  const images = [japan, mexico, england, india];
  const [currentImg, setCurrentImg] = useState(0);
  function nextImg() {
    if (currentImg === 3) {
      setCurrentImg(0);
    } else {
      setCurrentImg((prev) => prev + 1);
    }
  }

  function prevImg() {
    if (currentImg === 0) {
      setCurrentImg(3);
    } else {
      setCurrentImg((prev) => prev - 1);
    }
  }
  return (
    <div id={styles.aboutMainCont}>
      <div id={styles.aboutInnerCont}>
        <h1 id={styles.aboutTitle}>About Us</h1>
        <div
          style={{ backgroundImage: `url(${images[currentImg]})` }}
          id={styles.imgCarrousel}
        >
          <div id={styles.imgBtnsCont}>
            <span
              onClick={prevImg}
              className={"material-symbols-outlined " + styles.imgBtn}
            >
              chevron_left
            </span>
            <span
              onClick={nextImg}
              className={"material-symbols-outlined " + styles.imgBtn}
            >
              chevron_right
            </span>
          </div>
        </div>
        <div id={styles.aboutText}>
          <h2 className={styles.aboutSubTitle}>Our Journey</h2>
          <p className={styles.aboutParagraph}>
            Welcome to Mountain Harmony, where our passion for tea goes beyond
            the ordinary—it's a symphony of flavors and traditions. Established
            in 2010 by Aram Hekimian, our story began in the scenic valleys of
            Sri Lanka, inspired by a vision to bring exceptional teas to
            enthusiasts everywhere.
          </p>
          <h2 className={styles.aboutSubTitle}>Our Philosophy</h2>
          <p className={styles.aboutParagraph}>
            At Mountain Harmony, we believe every cup of tea is a conversation
            with cultures and histories. Our philosophy revolves around three
            pillars: authenticity, quality, and harmony. Each tea we offer is a
            testament to this, selected for its unique character and richness.
          </p>
          <h2 className={styles.aboutSubTitle}>Our Collection</h2>
          <p className={styles.aboutParagraph}>
            Mountain Harmony's collection is a curated tapestry of the world's
            finest teas. From the robust Assam black teas and the aromatic
            oolongs of Taiwan to rare herbal infusions from the Mediterranean,
            our range caters to every palate. We take pride in our exclusive
            line of organic, handcrafted blends, created by Aram himself, that
            promise a one-of-a-kind experience.
          </p>
          <h2 className={styles.aboutSubTitle}>Sustainability and Community</h2>
          <p className={styles.aboutParagraph}>
            Sustainability is at the heart of Mountain Harmony. We are dedicated
            to eco-friendly practices and ensuring the prosperity of our tea
            growers. Our 'Tea for Trees' initiative plants a tree for every 100
            cups sold, and we actively participate in community upliftment
            programs in tea-growing regions.
          </p>
          <h2 className={styles.aboutSubTitle}>Join Our Tea Community</h2>
          <p className={styles.aboutParagraph}>
            Mountain Harmony is more than just a tea shop—it's a haven for tea
            enthusiasts to explore, engage, and celebrate the diversity of tea.
            Whether you're discovering your first brew or are a seasoned
            connoisseur, Aram and the team invite you to join our community.
            Embark on this delightful journey with us and find your perfect
            harmony in a cup.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
