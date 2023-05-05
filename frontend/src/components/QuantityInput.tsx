import React from 'react'
import styles from "../css/QuantityInput.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

interface QuantityInputProps{
  quantity: number,
  setQuantity: (quantity: number) => void
}

const QuantityInput = ({quantity, setQuantity} : QuantityInputProps) => {

  return (
    <div className={styles.quantity_div}>
        <button onClick={() => quantity >= 2 ? setQuantity(quantity - 1) : null} className={`${styles.quantity_button} ${styles.left}`}><FontAwesomeIcon icon={faMinus}/></button>
        <input className={styles.quantity_input} readOnly type="text" onChange={e => setQuantity(+e.target.value)} value={quantity}/>
        <button onClick={() => setQuantity(quantity + 1)} className={`${styles.quantity_button} ${styles.right}`}><FontAwesomeIcon icon={faPlus}/></button>
    </div>
  )
}

export default QuantityInput
