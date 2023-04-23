import React, { useState } from 'react'
import "../css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../components/Navigation';
import Categories from '../components/Categories';

const Home = () => {
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const handleClick = () => {
    const video = document.getElementById("background-video") as HTMLVideoElement;
    video!.muted = !video?.muted
    setIsMuted(!isMuted);
  }

  return (
    <main id="home-page">
      <Navbar/>
      <button id="sound-button" className="toggle-sound" onClick={handleClick}>{isMuted? <FontAwesomeIcon icon={faVolumeUp} />:<FontAwesomeIcon icon={faVolumeXmark}/>}</button>
      <Categories/>
    </main>
  )
}

export default Home;
