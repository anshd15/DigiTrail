import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecievedPage from "./pages/RecievedPage";
import SendPage from "./pages/SendPage";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/recieve" element={<RecievedPage />} />
          <Route path="/send" element={<SendPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
