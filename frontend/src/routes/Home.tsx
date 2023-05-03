import React from 'react'
import styles from "../css/Home.module.css";
import Categories from '../components/Categories';
import SoundButton from '../components/SoundButton';
import Navigation from '../components/Navigation';

const Home = () => {

  return (
    <div id={styles.home_page}>
      <Navigation source={"/FinalVideo.mp4"} title={"Star Tech"}/>
      <SoundButton/>
      <Categories/>
    </div>
  )
}

export default Home;
