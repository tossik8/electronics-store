import React, { useContext } from 'react'
import Device from './Device'
import { DevicesContext } from '../context/DevicesContext'
import "../css/DevicesList.css"

interface DevicesListProps{
    title: string | undefined,
}

const DevicesList = ({title} : DevicesListProps) => {
  const context = useContext(DevicesContext);
  return (
    <main id="devices">
        <h1 id="category-title">{title}</h1>
        <div className="devices-wrapper">
            {context? context.devices.map(device => (
                <Device key={device.id} title={device.name + " " + device.model} url={device.url} price={device.price}/>
            )): "No devices"}
        </div>
    </main>
  )
}

export default DevicesList
