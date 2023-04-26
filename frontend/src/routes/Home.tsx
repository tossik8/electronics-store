import React from 'react'
import "../css/Home.css";
import Categories from '../components/Categories';
import SoundButton from '../components/SoundButton';
import Navigation from '../components/Navigation';

const Home = () => {

  return (
    <main id="home-page">
      <Navigation source={"/FinalVideo.mp4"} title={"Star Tech"}/>
      <SoundButton/>
      <Categories/>
    </main>
  )
}

export default Home;
