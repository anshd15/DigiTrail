import { useState } from "react";
import "./App.css";
import TrackingPage from "./pages/Tracking";
import Home from "./pages/Home";
import SendPage from "./pages/SendPage";
import RecievedPage from "./pages/RecievedPage";
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
              path="/send"
              element={<SendPage/>}
            />
            <Route
              path="/recieved"
              element={<RecievedPage/>}
            />
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
