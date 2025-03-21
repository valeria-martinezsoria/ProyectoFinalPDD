import { useEffect, useState } from "react";
import TaskService from "../servicesFacade/TaskService"; // Asegúrate de que esta ruta sea correcta

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TaskService.getAll().then(setTasks); // Llama al servicio para obtener todas las tareas
  }, []);

  const handleDelete = (id) => {
    TaskService.delete(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id)); // Elimina la tarea de la lista después de la eliminación
    });
  };

  return (
    <div>
      <h2>Lista de tareas pendientes: ⌚</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.title} - {task.status}
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
