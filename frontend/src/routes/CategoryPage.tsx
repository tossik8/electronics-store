import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navigation from '../components/Navigation';
import SoundButton from '../components/SoundButton';
import { DevicesContext } from '../context/DevicesContext';
import DevicesList from '../components/DevicesList';
import DeviceFinder from '../apis/DeviceFinder';

const CategoryPage = () => {
    window.scrollTo(0, 0);
    const { category } = useParams();
    const context = useContext(DevicesContext);
    useEffect(() => {
        async function fetchData() {
            const devices = await DeviceFinder(`/${category}`);
            if(context){
                context.setDevices(devices.data.data);
            }
        }
        fetchData();
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
    <>
        <Navigation source={source}/>
        <SoundButton/>
        <DevicesList title={category}/>
    </>
  )
}

export default CategoryPage
