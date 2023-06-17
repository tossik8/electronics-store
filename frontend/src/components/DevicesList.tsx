import React, { useContext, useRef } from 'react'
import Device from './Device'
import { DevicesContext } from '../context/DevicesContext'
import styles from "../css/DevicesList.module.css"
import AlertBox from './AlertBox'

interface DevicesListProps{
    title: string | undefined,
}

const DevicesList = ({title} : DevicesListProps) => {
  const { devices } = useContext(DevicesContext);
  const timeout = useRef<number>(null!);
  return (
    <>
      <AlertBox/>
      <main id={styles.devices}>
        <h1 id={styles.category_title}>{title}</h1>
        <div className={styles.devices_wrapper}>
            {devices.map(device => (
                <Device key={device.id} id={device.id} name={device.name} model={device.model} url={device.url} price={device.price} description={device.description} category_id={device.category_id} timeout={timeout}/>
            ))}
        </div>
      </main>
    </>

  )
}

export default DevicesList
