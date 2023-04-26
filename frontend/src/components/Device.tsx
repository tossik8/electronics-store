import React from 'react'
import "../css/Device.css"

interface DeviceProps{
    title: string,
    url: string,
    price: string
}

const Device = ({title, url, price} : DeviceProps) => {
  console.log(typeof(price));
  return (
    <article>
        <img className="device-image" src={url} alt="Device image." />
        <h3 className="device-title">{title}</h3>
        <p className="price">{price}</p>
    </article>
  )
}

export default Device
