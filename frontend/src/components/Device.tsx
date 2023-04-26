import React from 'react'
import "../css/Device.css"

interface DeviceProps{
    title: string,
    url: string
}

const Device = ({title, url} : DeviceProps) => {
  return (
    <article>
        <img className="device-image" src={url} alt="Device image." />
        <h3 className="device-title">{title}</h3>
    </article>
  )
}

export default Device
