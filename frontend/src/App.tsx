import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { DevicesContextProvider } from "./context/DevicesContext";

function App() {

  return (
    <DevicesContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </Router>
      </div>
    </DevicesContextProvider>

  )
}

export default App
