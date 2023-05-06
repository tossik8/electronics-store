import React, { useContext } from 'react'
import styles from "../css/Cart.module.css"
import Navigation from '../components/Navigation'
import { DevicesContext } from '../context/DevicesContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

const Cart = () => {
  const  { cart, setCart } = useContext(DevicesContext);

  return (
    <>
      <Navigation height={true}/>
      <main id={styles.cart_main}>
        <h1>Cart</h1>
        <div className={styles.panel}>
          <section className={styles.cart_section}>
            {cart.map(device => (
              <div key={device.id}>
                <article className={styles.cart_article}>
                  <img className={styles.device_image} src={device.url} alt="Device image."/>
                  <div className={styles.device_info}>
                    <p className={styles.device_title}>{device.name} {device.model}</p>
                    <p className={styles.device_price}>Price: {device.price}€</p>
                    <p className={styles.device_quantity}>Quantity: {device.quantity}</p>
                    <p className={styles.item_total}>Total: {+device.price * device.quantity!}€</p>
                    <button className={styles.delete}><FontAwesomeIcon className={styles.trash} icon={faTrash}/>Delete</button>
                  </div>
                </article>
                <div className={styles.divider}/>
              </div>
            ))}
          </section>
          <div className={styles.order}>
            <p className={styles.total}>Total price: {cart.reduce((sum, device) => sum + (device.quantity! * +device.price), 0)}€</p>
            <button>Proceed to checkout</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Cart
