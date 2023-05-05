import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { useParams } from 'react-router-dom'
import styles from "../css/DeviceDetails.module.css"
import { DevicesContext } from '../context/DevicesContext'
import DeviceFinder from '../apis/DeviceFinder'
import QuantityInput from '../components/QuantityInput'

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
    }, [])
  return (
    <>{
        selectedDevice ? <>
            <Navigation height={true}/>
                <main id={styles.device_main}>
                    <div className={styles.panel}>
                        <div id={styles.device_details}>
                            <h1 id={styles.device_title}>{name}</h1>
                            <p id={styles.description}>{selectedDevice.description}</p>
                            <p id={styles.price}>{selectedDevice.price}€</p>
                            <div className={styles.controls_div}>
                                <button className={styles.cart_button}>Add to cart</button>
                                <QuantityInput/>
                            </div>
                        </div>
                        <img id={styles.device_image} src={selectedDevice.url} alt="Device image."/>
                    </div>
                </main>
        </> : null
    }</>
  )
}

export default DeviceDetails
