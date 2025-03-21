import { useEffect, useState } from "react";
import TaskService from "../servicesFacade/TaskService";

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    TaskService.getAll().then(setTasks);
  }, []);

  const handleDelete = (id) => {
    TaskService.delete(id).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const handleStatusChange = async (id, newStatus) => {
    const taskToUpdate = tasks.find((task) => task.id === id);
    const updatedTask = { ...taskToUpdate, status: newStatus };
    await TaskService.update(id, updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  return (
    <div>
      <h2>Lista de Tareas: ⌚</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.status}`}>
            <strong>{task.title}</strong> - {task.description}
            <select
              value={task.status}
              onChange={(e) => handleStatusChange(task.id, e.target.value)}
            >
              <option value="pending">Pendiente</option>
              <option value="in-progress">En Progreso</option>
              <option value="done">Hecha</option>
            </select>
            <button onClick={() => handleDelete(task.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;