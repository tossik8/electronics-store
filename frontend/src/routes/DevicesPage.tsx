import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DevicesList from '../components/DevicesList';
import { DevicesContext } from '../context/DevicesContext';
import DeviceFinder from '../apis/DeviceFinder';
import Navigation from '../components/Navigation';
import styles from "../css/DevicesPage.module.css"

const DevicesPage = () => {
    window.scrollTo(0, 0);
    const {name} = useParams();
    const { setDevices } = useContext(DevicesContext);
    useEffect(() => {
        async function fetchData() {
            try{
                const response = await DeviceFinder(`/?query=${name}`);
                setDevices(response.data.data);
            } catch (e) {
            console.error(e);
            }
        }
        fetchData();
    }, [])
  return (
    <>
        <div id={styles.navigation_wrapper}>
            <Navigation height={true}/>
        </div>
        <DevicesList title={`Results for ${name}`}/>
    </>
  )
}

export default DevicesPage
