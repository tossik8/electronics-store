import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { DevicesContextProvider } from "./context/DevicesContext";
import CategoryPage from "./routes/CategoryPage";
import DevicesPage from "./routes/DevicesPage";
import DeviceDetails from "./routes/DeviceDetails";

function App() {

  return (
    <DevicesContextProvider>
      <>
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/search/:name" element={<DevicesPage/>}/>
            <Route path="/:category" element={<CategoryPage />}/>
            <Route path="/item/:name" element={<DeviceDetails/>}/>
          </Routes>
        </Router>
      </>
    </DevicesContextProvider>

  )
}

export default App
