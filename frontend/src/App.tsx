import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { DevicesContextProvider } from "./context/DevicesContext";
import CategoryPage from "./routes/CategoryPage";
import DevicesPage from "./routes/DevicesPage";
import DeviceDetails from "./routes/DeviceDetails";
import Cart from "./routes/Cart";
import CheckoutPage from "./routes/CheckoutPage";
import Thankyou from "./routes/ThankyouPage"
function App() {

  return (
    <DevicesContextProvider>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/search/:name" element={<DevicesPage/>}/>
            <Route path="/category/:category" element={<CategoryPage />}/>
            <Route path="/item/:name" element={<DeviceDetails/>}/>
            <Route path="/checkout" element={<CheckoutPage />}/>
            <Route path="/Thankyou" element={<Thankyou />}/>
          </Routes>
        </Router>
      </>
    </DevicesContextProvider>

  )
}

export default App
