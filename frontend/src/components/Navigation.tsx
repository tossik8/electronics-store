import React, { useContext, useEffect, useState } from 'react'
import "../css/Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom';
import DeviceFinder from '../apis/DeviceFinder';
import { DevicesContext } from '../context/DevicesContext';


interface NavigationProps{
  source?: string,
  title?: string
}

const Navigation = ({source, title} : NavigationProps) => {
  const [input, setInput] = useState<string>("");
  let navigation = useNavigate();

  const context = useContext(DevicesContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.target.id === "background-video"){
          const video = entry.target as HTMLVideoElement;
          if(entry.isIntersecting){
            video.play();
          }
          else{
            video.pause();
          }
        }
      })
    }, { root: null, rootMargin: "0px", threshold: 0.8 });
    if(document.getElementById("background-video")){
      observer.observe(document.getElementById("background-video") as HTMLVideoElement);
    }
  }, []);

  const handleSearch = async () => {
    if(input.trim() !== ""){
      try{
        const response = await DeviceFinder(`/?query=${input}`);
        if(context !== null){
          context.setDevices(response.data.data);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <header id="navigation-section">
      <nav className="navigation-panel">
        <img id="logo" src="/star-tech-logo.png" alt="Logo." onClick={() => navigation("/")}/>
        <form onSubmit={e => e.preventDefault()} className="search-bar-form">
          <button type="button" className="button-icon search" onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          <input className="item-search" placeholder="Item name" type="text" onKeyUp={e => e.key === "Enter" ? handleSearch() : null} onChange={e => setInput(e.target.value)} value={input}/>
          <button type="button" className="button-icon delete" onClick={() => setInput("")} ><FontAwesomeIcon icon={faXmark} /></button>
        </form>
        <div className="icons">
          <button type="button" className="button-icon cart"><FontAwesomeIcon icon={faCartShopping} /></button>
          <button type="button" className="button-icon profile"><FontAwesomeIcon icon={faUser} /></button>
        </div>
      </nav>
      {title?<h1 id="title">{title}</h1> : null}
      {source? <video id="background-video" muted loop src={source}></video> : null}
    </header>
  )
}

export default Navigation
