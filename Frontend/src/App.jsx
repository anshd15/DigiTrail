import { useState } from "react";
import "./App.css";
import TrackingPage from "./pages/Tracking";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <div className="main">
          <Toaster />
          <Routes>
            <Route
              path="/"
              element={<Home/>}
            />
            <Route
              path="/track"
              element={<TrackingPage/>}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
