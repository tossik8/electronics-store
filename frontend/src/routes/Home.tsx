import React, { useState } from 'react'
import "../css/Home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeXmark, faVolumeUp } from "@fortawesome/free-solid-svg-icons";
import Navbar from '../components/Navbar';

const Home = () => {
  const [isMuted, setIsMuted] = useState(true);

  const handleClick = () => {
    const video = document.getElementById("background-video") as HTMLVideoElement;
    video!.muted = !video?.muted
    setIsMuted(!isMuted);
  }

  return (
    <div id="home-page">
      <button id="sound-button" className="toggle-sound" onClick={handleClick}>{isMuted? <FontAwesomeIcon icon={faVolumeUp} />:<FontAwesomeIcon icon={faVolumeXmark}/>}</button>
      <Navbar/>
      <video id="background-video" autoPlay muted loop playsInline>
        <source src="/FinalVideo.mp4"></source>
      </video>
    </div>
  )
}

export default Home;
