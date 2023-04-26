import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../components/Navigation';
import SoundButton from '../components/SoundButton';
import { DevicesContext } from '../context/DevicesContext';
import DevicesList from '../components/DevicesList';

const CategoryPage = () => {
    const { category } = useParams();
    const context = useContext(DevicesContext);
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])
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
        <DevicesList title={category} context={context}/>
    </main>
  )
}

export default CategoryPage
