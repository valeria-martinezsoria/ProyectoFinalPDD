import { useState } from "react";
import TaskService from "../servicesFacade/TaskService"; // Asegúrate de que esta ruta sea correcta

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, status: "pending" };
    await TaskService.create(newTask); // Llamada al servicio para crear la tarea
    setTitle(""); // Limpiar el campo de título
    setDescription(""); // Limpiar el campo de descripción
    onTaskAdded(); // Llamada a la función que actualiza el estado del componente principal
  };

  return (
    <div>
      <div className="title-container">
        <h1 className="title">Gestor de Tareas:</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <h3>Agrega una nueva tarea: 🗒️</h3>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default TaskForm;