import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../components/Navigation';
import SoundButton from '../components/SoundButton';
import { DevicesContext } from '../context/DevicesContext';
import Device from '../components/Device';
import "../css/CategoryPage.css"

const CategoryPage = () => {
    const { category } = useParams();
    const context = useContext(DevicesContext);
    let source = "";
    if(category === "Phones"){
        source = "/PhonesPage.mp4"
    }
    else if(category === "Laptops"){
        source = "/LaptopsPage.mp4"
    }
    else if(category === "TVs"){
        source = "/TVsPage.mp4"
    }
    else if(category === "Headphones"){
        source = "/HeadphonesPage.mp4"
    }
  return (
    <main>
        <Navigation source={source}/>
        <SoundButton/>
        <section id="devices">
            {context? context.devices.map(device => (
                <Device key={device.id} title={device.name + " " + device.model} url={device.url} price={device.price}/>
            )): "No devices"}
        </section>
    </main>
  )
}

export default CategoryPage
