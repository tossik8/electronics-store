import React, { useContext, useEffect } from 'react'
import Navigation from '../components/Navigation'
import { useParams } from 'react-router-dom'
import "../css/DeviceDetails.css"
import { DevicesContext } from '../context/DevicesContext'
import DeviceFinder from '../apis/DeviceFinder'

const DeviceDetails = () => {
    const { name } = useParams();
    const { selectedDevice, setSelectedDevice } = useContext(DevicesContext);

    useEffect(() => {
        async function fetchData() {
            try{
                const device = await DeviceFinder(`/device/${name}`);
                setSelectedDevice(device.data.data[0]);
            } catch(e) {
                console.error(e)
            }
        }
        fetchData();
        document.getElementById("navigation-section")?.classList.add("adjusted-height")
    }, [])
  return (
    <>{
        selectedDevice ? <>
            <Navigation/>
                <main id="device-main">
                    <div className="panel">
                        <div id="device-details">
                            <h1 id="device-title">{name}</h1>
                            <p id="description">{selectedDevice.description}</p>
                            <p id="price">{selectedDevice.price}€</p>
                            <button className="cart-button">Add to cart</button>
                        </div>
                        <img id="device-image" src={selectedDevice.url} alt="Device image."/>

                    </div>
                </main>
        </> : null
    }</>
  )
}

export default DeviceDetails
