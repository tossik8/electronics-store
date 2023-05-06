import React, { useContext } from 'react'
import styles from "../css/Cart.module.css"
import { DevicesContext } from '../context/DevicesContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

const Cart = () => {
  window.scrollTo(0, 0);
  const  { cart, setCart } = useContext(DevicesContext);
  const navigation = useNavigate();

  const handleClick = (name: string) => {
    navigation(`/item/${name}`);
  }

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    const newCart = cart.filter(device => device.id !== id);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart([...newCart]);
  }

  return (
    <>
      <Navigation height={true}/>
      <main id={styles.cart_main}>
        <h1 className={styles.cart_title}>Cart</h1>
        <div className={styles.panel}>
          <section className={styles.cart_section}>
            {cart.map(device => (
              <div key={device.id}>
                <article className={styles.cart_article}>
                  <img loading='lazy' onClick={() => handleClick(device.name + " " + device.model)} className={styles.device_image} src={device.url} alt="Device image."/>
                  <div className={styles.device_info}>
                    <div onClick={() => handleClick(device.name + " " + device.model)} className={styles.device_details}>
                      <p className={styles.device_title}>{device.name} {device.model}</p>
                      <p className={styles.device_price}>Price: {device.price}€</p>
                      <p className={styles.device_quantity}>Quantity: {device.quantity}</p>
                      <p className={styles.item_total}>Total: {(+device.price * device.quantity!).toFixed(2)}€</p>
                    </div>
                    <button onClick={(e) => handleDelete(e, device.id)} className={styles.delete}><FontAwesomeIcon className={styles.trash} icon={faTrash}/>Delete</button>
                  </div>
                </article>
                <div className={styles.divider}/>
              </div>
            ))}
          </section>
          <div className={styles.order}>
            <p className={styles.total}>Total price: {cart.reduce((sum, device) => sum + (device.quantity! * +device.price), 0).toFixed(2)}€</p>
            <button className={styles.checkout_button}>Proceed to checkout</button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Cart
