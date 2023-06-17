import React from 'react'
import styles from "../css/Categories.module.css"
import { useNavigate } from 'react-router-dom'

const Categories = () => {

  let navigation = useNavigate();

  const handleClick = (category: string) => {
    navigation(`/category/${category}`);
  }

  return (
    <main id={styles.categories_section}>
      <h2 className={styles.categories_heading}>Shop by category</h2>
      <div className={styles.categories_div}>
        <article className={styles.category_article} onClick={() => handleClick("Phones")}>
          <img src="/mobile-phone.jpg" loading="lazy" className={styles.category_image} />
          <p className={styles.category_title}>Phones</p>
          <p className={styles.description}>High class, high quality phones at affordable prices</p>
        </article>
        <article className={styles.category_article} onClick={() => handleClick("Laptops")}>
          <img src="/laptop.jpg" loading="lazy" className={styles.category_image}/>
          <p className={styles.category_title}>Laptops</p>
          <p className={styles.description}>Cutting-edge laptops</p>
        </article>
        <article className={styles.category_article} onClick={() => handleClick("TVs")}>
          <img src="/tv.jpg" loading="lazy" className={styles.category_image}/>
          <p className={styles.category_title}>TVs</p>
          <p className={styles.description}>High-resolution TVs</p>
        </article>
        <article className={styles.category_article} onClick={() => handleClick("Headphones")}>
          <img src="/headphones.jpg" loading="lazy" className={styles.category_image}/>
          <p className={styles.category_title}>Headphones</p>
          <p className={styles.description}>The sound quality you have never heard before</p>
        </article>
      </div>
    </main>
  )
}

export default Categories
