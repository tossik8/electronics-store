import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IDevice } from '../context/DevicesContext';
import { RiLockPasswordLine } from 'react-icons/ri';
import { FaDollarSign } from 'react-icons/fa';
import DeviceFinder from '../apis/DeviceFinder';
import Navigation from '../components/Navigation';
import { useNavigate } from 'react-router-dom';

// Component to display a payment method with its logo
interface PaymentMethodProps {
  name: string;
  logo: string;
}

const PaymentMethod: React.FC<PaymentMethodProps> = ({ name, logo }) => {
  return (
    <div className="col">
      <div className="p-3 payment-method">
        <label htmlFor={name}>
          <img className="payment-method-logo" src={logo} alt={name}  style={{ width: '80px', height: 'auto' }}  />
          <input type="checkbox" id={name} name={name} value={name} />
          
        </label>
      </div>
    </div>
  );
};

const CheckoutPage = () => {
  window.scrollTo(0, 0);
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

  const handleThank = () => {
    navigation('/Thankyou');
  };

  return (
    <>
      <Navigation source={'/FinalVideo.mp4'} title={'Checkout'} />
      
      <div className="container">
      <div className="card price-card" style={{ bottom: 0, right: 0 }}>
      <div className="card-body">
        <h5 className="card-title">Total price</h5>
        <div className="d-flex align-items-center">
          <FaDollarSign className="total-price-icon" />
          <div className="total-price-text">Total price: {getTotalPrice()}€</div>
          </div>
        </div>
      </div>

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
          <div className="payment-methods">
            <label>Payment Method:</label>
            <div className="container text-center">
              <div className="row row-cols-2 row-cols-lg-5 g-2 g-lg-3">
                <PaymentMethod name="PayPal" logo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQMAAADCCAMAAAB6zFdcAAAAulBMVEX///8SOYT19fUAn+MAL4CFk7gAJXwAIXv19/nd4ekAo+cSNoIAoucSN4P//vsTMX4AKX4ALH8QSpISMH0AJHxHXJUAM4IIgscRPoi2vdGvt8wQRI04U5IAK39idaQDm+BUaZ0AG3kFktcPT5cLcbYJhctqfKlYbZ/Ax9jr7vENXaSjrMUMaq/U2ePu7/EqSY2Xor/Hzdt6irEOWJ8MbbKQm7oKeb9HX5czUJAoSIx0hK0AAHSoscoADnVpRTGIAAAI0UlEQVR4nO2da3uquhKAvSBUQrgIxbtWrVXbau1qtZe9zv//W4eQTACFdrWIl+eZ98veLegyL8nMZERbKiEIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIchquLo1DC2gPuqqnXhKe2h20D2mAqj6l5cuCUl+lB7Nwp13a+AGq3R1Gwcw+9VByYM8OoWCjnnocuVA3+RXUR6ceRU5G9dwOBv6pB5ETf5BXwZV9qfEQoHbeSmHunXoMufHmOR2snVMPITfOOqeDmnLqIeRGqaEDdIAOGOgAHTDQATpgoAN0wEAH6ICBDtABAx2gAwY6QAcMdIAOGOgAHTDQATpgoIOCHZAkB3ljkiY5xFMW6cDpXcfpdTX7AO9RNxJ0iUv+5VGkFZJ6boEOnLVZMhOs2jMv55UjQyNJdfyaPrIEVjM8Wb9NO7VAB9qisof5XM41Fci9Xt1Frz5a3z3OHfJTH4/sQDH3HVTMxT9ctS8c3O47CIb2+p0Ey+AnTo7rwL9JcxDMBC2Hg2BOpzio6i9fi6UN4SD1aHEOlD+pDirmTY7V4I7TFFSNsfvlw8g9dzBMnS/FOXAehAMeDyMHnf6vFVAyhCsfEk2E7tcOxBIaH9mBOhdj3gQpsjfrSAvL39+9Q7ti2MMuS4z3Y1gZ+v2Xi0EsIaN5bAd1mPtKUB/5oxpIqP/eAXkRgx67rEAiFiwNIzXgRw74ecbrkesDH+Y+L+aoTJWLHA5e+TwwtvyCylT5jQOxhDJCZ2EOyLuZHLL3vDMPlL6naZrXZyGSF9Pst9RnJF8rgd9ZWxHfxQWFeC/XQjA13ACLP5Usplv6V1GjMAfKnXCwFLfyakvhYM5+QfvKXWe5qCyWnTeP+ryqZsP9uHkLuI7f7eZc3zCufZkW4IKSCTiYsMFSt/s6HQ+Hw+kjJbTFi2nKlpCYLullRGEOnI1w0BF3dCsrsTbY3XyKv17JtNEZDUpm8FRm26b+gqeRdnQfuPfAf1V6J5ZIC3qDX1/yCEGR/WRNprrBg58+nLhjnjsCCXBaRgYtzIHdhrTAL6kP88Ic+GX7ZhErHswa9xVkTeqIqGHKBOrPxKl1hbYgF4q1IssFNjp3q8cLKCiPu3IJZaSF4hx4y2jIbCS23D04ZXWnfFoshQul3P/LD5l34nmpnD89n070avyCWhAS9VurTMaJMtqYiixKmCoDzjqmA2rDS+96qmprPYgGlbbqfGZUkDO/7L+ZcBp/Iq0tpGxsOaeNpmNZlmvJlWA0gjSZtpPgusQSyioiinJAnuSY5wFLOWrzTXmPRm1W4hXkR/AaPTFfFvxe8Ci0joKxwI5p3AyYDmHUxtR1t7JcYshFEc7/lpGIIsdykLFjqphtbwRTwnwetJz3TbQknOA19kWJzbcVpAUHmR9rKi982DoA9AZpQKFQvW1QGgRHOHRLynIJpb7S4hwotXQHC18ZwJGBpgQxu9+CSBEW0f61cPCXRcWRKCrMTxZZM3ZMwTq3xKD1KbVYMnQfY4UDeeQHhxkbq6IcQGzbpeerUCu9iRpAkSEgzIeaqLFZKeUIk+Y83HBbqUteb7pUTINgUYh/3xWbbJYara3OD2Z0GYpyIEeaWAj19yC/QYyTH4MSi0NkUdhvmj0ig8pKCUugRkrzwGDRXowyNtuhejIsuYT07ZEd7DXSgiKnXtNI1FaIPglmd/gZPB0SWAxrR+bXGT8iG2milxjEPqPZteQiiSU/SsRu2f2mkVagA9lIq7c5D7VrlZ3aF5vo+b6DJ/4aPbEYlv+tITTwHYZspBnTZsj29r5shbFerIpYq4zI+U8pHM3o5xbkACJbpUJVO8RR+OuDRdKJiuGRGLT4ZJQjhl6BOFEXNSM00owtKw8YBLZOsCeSoxS7bDb/5dFWuoKiHChQBu11D+EqR5+DAl91MTPkjhNW0bVovlk7OyYJEckvdqXdpi7TglhC6Y204hzAtdxvnIGDFcwDChtKuTrUZULBBs6ERtreBZUOZDyAkMisWF820opzIBtpe4dhLZh/R+HPvgfF8APsl+WWk4cFOZNaEBJ3BwOzvVrt8hliNSBtlKNGWlZaKMoBXG1z7xOgUav1QVUde/QGZbT5Cc9EPuIOnmDiy2bB/gUlMORgy8zixCskUVYWQSMts9VUjAPah4nc2o3FUbQ0K/OHTj22kZC6tGgxmH9kNwXKvZQtcPS2gz7e3k6rsqRmZZEl/j/zPYhiHMgruXL28lF8tSeCXzRjokJbFIh8oNBI298Cyx0BOxzrIoRlUeubtFCQAx/2BCl9dL+3E/bFfxfRaMkHHFz5kUNLdATStsCyUIQJIE4N5j/0oo3Mt2GKcaBsEluAJMn2gflX/PgcFU2yB20OYs++20hL4MbbB0a1KwrHSbRjyn4rqhgHsuZPPWrfyYtvmrX/8XOjtBDEA2gmdeLVBanqYYGc3hm1mnoUE1qWOLcl33bP3DEVFg96nZC1klqeKuWHsHVaWnWe+v6MNVnm7Q95qiI7iInPUpPHbUjqe8fBWF+mLBbo+vjeomQbdllYKiCP05Dst2ULyo2kzwvkjAqdOl5vMJj1NDt4YX74NTXRVwhQH9pw18nESkSBnDEU4pYnLy+TcnhjSuzUbx52wnuyyN47KYA2h43jj79khP7qpqfzuy+t/0fmlCN9u8TZOYjy4nueG1Z+wrk5kDuoWIFYNOfmQG44c92y8zPOzYEvbltZlY+1Es7Qwc0gJNfdaz/k3ByUfc4xv3Do7BycAHSADhjoAB0w0AE6YKADdMBAB+iAgQ7QAQMdoAMGOkAHDHSADhjoAB0w0AE6YKADdMDI7QD/9kCplHbn2YVh5/0jTYtj3S1SGNRb5HRQyvO1FmeBf5NXQYl98PCiGS1zOyh9XnZUdD7zKyiVepecHpXeIRSUrt7US42LVH071J9xXGvOYb4R7qhQ4mh5S4MYlXXP1i4Nu7euHE4B46p+aRz8j5kiCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCIIgCPJv/B95Pg8r/FsUCwAAAABJRU5ErkJggg==" />
                <PaymentMethod name="Visa" logo="data:image/png;base64,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" />
                <PaymentMethod name="Mastercard" logo="data:image/png;base64,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" />
                {/* Add more payment methods here */}
                <button onClick={handleThank} type="submit" className="btn btn-primary" style={{bottom: 0, right: 0 ,width: '300px', height: '50px'}}> Submit</button> 
              </div>
            </div> 
                      
          </div> 
                
        </form>
        
        
      </div>
      
      
    </>
  );
};

export default CheckoutPage;
