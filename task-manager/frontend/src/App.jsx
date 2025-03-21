import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Home from "./views/Home"; // Asegúrate de tener este archivo de componente creado

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
    </Router>
  );
}

export default App;

