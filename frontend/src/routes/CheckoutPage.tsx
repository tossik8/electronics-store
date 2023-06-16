import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IDevice } from '../context/DevicesContext';
import { RiLockPasswordLine } from 'react-icons/ri';
import DeviceFinder from '../apis/DeviceFinder';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';
const CheckoutPage = () => {
  const location = useLocation();
  const { cart } = location.state as { cart: IDevice[] };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [creditCard, setCreditCard] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigate();
  const getTotalPrice = () => {
    const totalPrice = cart.reduce((sum: number, device: IDevice) => {
      return sum + device.quantity! * +device.price;
    }, 0);

    return totalPrice.toFixed(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await DeviceFinder.post('/users', {
        username: name,
        email,
        address,
        creditCard,
        password,
      });

      console.log(response);

      setName('');
      setEmail('');
      setAddress('');
      setCreditCard('');
      setPassword('');
      
    } catch (error) {
      console.error(error);
    }
  };
  const handleThank= () => {
    navigation("/Thankyou"); // Separate the pathname and state
  };

  return (
    <div className="container">
      <h1>Checkout</h1>
      <p>Total price: {getTotalPrice()}€</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="creditCard">Credit Card</label>
          <input
            type="text"
            className="form-control"
            id="creditCard"
            value={creditCard}
            onChange={(e) => setCreditCard(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-input">
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <RiLockPasswordLine className="password-icon" />
          </div>
        </div>
        <button onClick={handleThank} type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>




  );
};

export default CheckoutPage;
