import React, { useContext, useEffect, useState } from 'react'
import styles from "../css/Navigation.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faCartShopping, faUser, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useLocation, useNavigate } from 'react-router-dom';
import DeviceFinder from '../apis/DeviceFinder';
import { DevicesContext } from '../context/DevicesContext';


interface NavigationProps{
  source?: string,
  title?: string,
  height?: boolean
}

const Navigation = ({source, title, height} : NavigationProps) => {
  const [input, setInput] = useState<string>("");
  let navigation = useNavigate();
  let location = useLocation();
  const { setDevices } = useContext(DevicesContext);

  useEffect(() => {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if(entry.target.id === styles.background_video){
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
    if(document.getElementById(styles.background_video)){
      observer.observe(document.getElementById(styles.background_video) as HTMLVideoElement);
    }
    if(height){
        document.getElementById(styles.navigation_section)?.classList.add(styles.adjusted_height);
    }
  }, []);

  const handleSearch = () => {
    if(input.trim() !== ""){
      if(location.pathname.includes("/search/")){
        fetchData();
      }
      setInput("");
      navigation(`/search/${input}`);
    }
  }

  async function fetchData(){
    try{
      const response = await DeviceFinder(`/?query=${input}`);
      setDevices(response.data.data);
    } catch(e){
      console.error(e);
    }
  }

  return (
    <header id={styles.navigation_section}>
      <nav className={styles.navigation_panel}>
        <img id={styles.logo} src="/star-tech-logo.png" alt="Logo." onClick={() => navigation("/")}/>
        <form onSubmit={e => e.preventDefault()} className={styles.search_bar_form}>
          <button type="button" className={`${styles.button_icon} ${styles.search}`} onClick={handleSearch}><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
          <input className={styles.item_search} placeholder="Item name" type="text" onKeyUp={e => e.key === "Enter" ? handleSearch() : null} onChange={e => setInput(e.target.value)} value={input}/>
          <button type="button" className={`${styles.button_icon} ${styles.delete}`} onClick={() => setInput("")} ><FontAwesomeIcon icon={faXmark} /></button>
        </form>
        <div className={styles.icons}>
          <button type="button" className={`${styles.button_icon} ${styles.cart}`}><FontAwesomeIcon icon={faCartShopping} /></button>
          <button type="button" className={`${styles.button_icon} ${styles.profile}`}><FontAwesomeIcon icon={faUser} /></button>
        </div>
      </nav>
      {title?<h1 id={styles.title}>{title}</h1> : null}
      {source? <video id={styles.background_video} muted loop src={source}></video> : null}
    </header>
  )
}

export default Navigation
