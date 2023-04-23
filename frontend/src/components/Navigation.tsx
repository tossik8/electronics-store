import React from 'react'
import "../css/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"

const Navigation = () => {
  return (
    <section id="navigation-section">
      <nav className="navigation-panel">
        <img id="logo" src="/star-tech-logo.png" alt="Logo."/>
        <div className="search-bar-div">
          <button className="button-icon search"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          <input className="item-search" type="text" />
          <button className="button-icon delete" ><FontAwesomeIcon icon={faXmark} /></button>
        </div>
        <div className="icons">
          <button className="button-icon cart"><FontAwesomeIcon icon={faCartShopping} /></button>
          <button className="button-icon profile"><FontAwesomeIcon icon={faUser} /></button>
        </div>
      </nav>
      <h1 id="title">Star Tech</h1>
      <video id="background-video" autoPlay muted loop playsInline>
        <source src="/FinalVideo.mp4"></source>
      </video>
    </section>
  )
}

export default Navigation
