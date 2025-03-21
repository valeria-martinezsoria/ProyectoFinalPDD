import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

function Home() {
  const [tasksUpdated, setTasksUpdated] = useState(false);

  // Función para notificar que se ha agregado una nueva tarea
  const handleTaskAdded = () => {
    setTasksUpdated((prev) => !prev); // Cambia el estado para forzar la actualización de TaskList
  };

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} />
      <TaskList key={tasksUpdated} /> {/* Usar key para forzar la recarga de TaskList */}
    </div>
  );
}

export default Home;