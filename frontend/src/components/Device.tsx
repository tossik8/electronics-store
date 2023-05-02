import React, { useContext } from 'react'
import "../css/Device.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { DevicesContext } from '../context/DevicesContext';
import { useNavigate } from 'react-router-dom';

interface DeviceProps{
    id: number,
    name: string,
    model: string,
    description: string,
    url: string,
    price: string,
    category_id: number
}

const Device = ({id, name, category_id , model, description, url, price} : DeviceProps) => {
  const navigate = useNavigate();
  const { setSelectedDevice } = useContext(DevicesContext);
  const handleClick = () => {
    setSelectedDevice({
      id,
      name,
      model,
      description,
      url,
      price,
      category_id
    });
    navigate(`/item/${name} ${model}`);
  }
  return (
    <article className="device-article" onClick={handleClick}>
        <img className="device-image" src={url} alt="Device image." />
        <h3 className="device-title">{`${name} ${model}`}</h3>
        <div className="price-div">
          <p className="price">{price}€</p>
          <button className="button-icon"><FontAwesomeIcon className="cart" icon={faCartShopping}></FontAwesomeIcon></button>
        </div>
    </article>
  )
}

export default Device
