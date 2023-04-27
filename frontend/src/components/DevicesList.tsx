import React from 'react'
import Device from './Device'
import { DevicesContextType } from '../context/DevicesContext'
import "../css/DevicesList.css"

interface DevicesListProps{
    title: string | undefined,
    context: DevicesContextType | null
}

const DevicesList = ({title, context} : DevicesListProps) => {
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
