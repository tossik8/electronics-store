import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DevicesList from '../components/DevicesList';
import { DevicesContext } from '../context/DevicesContext';
import DeviceFinder from '../apis/DeviceFinder';
import Navigation from '../components/Navigation';
import "../css/DevicesPage.css"

const DevicesPage = () => {
    window.scrollTo(0, 0);
    const {name} = useParams();
    const context = useContext(DevicesContext);
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await DeviceFinder(`/?query=${name}`);
                if(context !== null){
                    context.setDevices(response.data.data);
                }
            } catch (e) {
            console.error(e);
            }
        }
        fetchData();
        document.getElementById("navigation-section")?.classList.add("adjusted-height");
    }, [])
  return (
    <>
        <div id="navigation-wrapper">
            <Navigation/>
        </div>
        <DevicesList title={`Results for ${name}`}/>
    </>
  )
}

export default DevicesPage
