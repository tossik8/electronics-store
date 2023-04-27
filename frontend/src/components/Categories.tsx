import React from 'react'
import "../css/Categories.css"
import { useNavigate } from 'react-router-dom'

const Categories = () => {

  let navigation = useNavigate();

  const handleClick = (category: string) => {
    navigation(`/${category}`);
  }

  return (
    <main id="categories-section">
      <h2 className="categories-heading">Shop by category</h2>
      <div className="categories-div">
        <article className="category-article" onClick={() => handleClick("Phones")}>
          <img src="/mobile-phone.jpg" loading="lazy" className="category-image" />
          <p className="category-title">Phones</p>
          <p className="description">High class, high quality phones at affordable prices</p>
        </article>
        <article className="category-article" onClick={() => handleClick("Laptops")}>
          <img src="/laptop.jpg" loading="lazy" className="category-image"/>
          <p className="category-title">Laptops</p>
          <p className="description">Cutting-edge laptops</p>
        </article>
        <article className="category-article" onClick={() => handleClick("TVs")}>
          <img src="/tv.jpg" loading="lazy" className="category-image"/>
          <p className="category-title">TVs</p>
          <p className="description">High-resolution TVs</p>
        </article>
        <article className="category-article" onClick={() => handleClick("Headphones")}>
          <img src="/headphones.jpg" loading="lazy" className="category-image"/>
          <p className="category-title">Headphones</p>
          <p className="description">The sound quality you have never heard before</p>
        </article>
      </div>
    </main>
  )
}

export default Categories
