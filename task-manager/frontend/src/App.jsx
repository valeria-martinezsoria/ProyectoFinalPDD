import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from 'react';
import './App.css';
import Home from "./views/Home"; // Asegúrate de tener este archivo de componente creado
import TaskList from './components/TaskList';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<TaskList />} />

    </Routes>
  );
}

export default App;

