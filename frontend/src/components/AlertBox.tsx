import React from 'react'
import styles from "../css/AlertBox.module.css"

const AlertBox = () => {
  return (
    <div id="alert-box" className={styles.invisible}>The item was added to the cart</div>
  )
}

export default AlertBox
