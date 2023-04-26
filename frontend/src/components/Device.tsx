import React from 'react'
import "../css/Device.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

interface DeviceProps{
    title: string,
    url: string,
    price: string
}

const Device = ({title, url, price} : DeviceProps) => {
  return (
    <article className="device-article">
        <img className="device-image" src={url} alt="Device image." />
        <h3 className="device-title">{title}</h3>
        <div className="price-div">
          <p className="price">{price}€</p>
          <button className="button-icon"><FontAwesomeIcon className="cart" icon={faCartShopping}></FontAwesomeIcon></button>
        </div>
    </article>
  )
}

export default Device
