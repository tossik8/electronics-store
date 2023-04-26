import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import { DevicesContextProvider } from "./context/DevicesContext";
import CategoryPage from "./routes/CategoryPage";

function App() {

  return (
    <DevicesContextProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/:category" element={<CategoryPage />}/>
          </Routes>
        </Router>
      </div>
    </DevicesContextProvider>

  )
}

export default App
