import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { useParams } from 'react-router-dom'
import styles from "../css/DeviceDetails.module.css"
import { DevicesContext, IDevice } from '../context/DevicesContext'
import DeviceFinder from '../apis/DeviceFinder'
import QuantityInput from '../components/QuantityInput'

const DeviceDetails = () => {
    const { name } = useParams();
    const { selectedDevice, setSelectedDevice, cart, setCart } = useContext(DevicesContext);
    const [ quantity, setQuantity ] = useState(1);

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
    }, []);

    const handleClick = () => {
        const newCart = setNewCart([], quantity);
        localStorage.setItem("cart", JSON.stringify(newCart));
        setCart(newCart);
    }
    function setNewCart(newCart: IDevice[], quantity: number){
        const item = {
            id: selectedDevice.id,
            name: selectedDevice.name,
            model: selectedDevice.model,
            description: selectedDevice.description,
            url: selectedDevice.url,
            price: selectedDevice.price,
            category_id: selectedDevice.category_id,
            quantity
        };
        const index = cart.findIndex(device => device.id === item.id);
        if(index !== -1){
          cart[index].quantity! += quantity;
          newCart = [...cart];
        }
        else{
          newCart = [...cart, item];
        }
        return newCart;
      }

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
                                <button onClick={handleClick} className={styles.cart_button}>Add to cart</button>
                                <QuantityInput quantity={quantity} setQuantity={setQuantity}/>
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
