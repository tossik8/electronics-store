import React, { useContext } from 'react'
import styles from "../css/Cart.module.css"
import Navigation from '../components/Navigation'
import { DevicesContext } from '../context/DevicesContext'

const Cart = () => {
  const  { cart, setCart } = useContext(DevicesContext);

  return (
    <>
      <Navigation height={true}/>
      <main id={styles.cart_main}>
        <div className={styles.panel}>
          <section className={styles.cart_section}>
            <h1>Cart</h1>
            {cart.map(device => (
              <article key={device.id} className={styles.cart_article}>
                <img className={styles.device_image} width={200} src={device.url} alt="Device image."/>
                <div className={styles.device_info}>
                  <p className={styles.device_title}>{device.name} {device.model}</p>
                  <p className={styles.device_price}>{device.price}</p>
                  <p className={styles.device_quantity}>{device.quantity}</p>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </>
  )
}

export default Cart
