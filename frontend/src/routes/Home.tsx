import React from 'react'
import "../css/Home.css";

const Home = () => {
  return (
    <div id="home-page">
      <nav></nav>
      <video id="background-video" autoPlay muted loop playsInline>
        <source src="/FinalVideo.mp4"></source>
      </video>
    </div>
  )
}

export default Home;
