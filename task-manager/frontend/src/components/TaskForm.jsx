import { useState } from "react";
import TaskService from "../servicesFacade/TaskService"; // Asegúrate de que esta ruta sea correcta

function TaskForm({ onTaskAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que los campos no estén vacíos
    if (!title.trim() || !description.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    // Crear la nueva tarea
    const newTask = { title, description, status: "pending" };

    try {
      // Enviar la tarea al backend
      const createdTask = await TaskService.create(newTask);

      // Limpiar los campos del formulario
      setTitle("");
      setDescription("");

      // Notificar al componente padre que se ha agregado una nueva tarea
      onTaskAdded(createdTask);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Hubo un error al crear la tarea. Por favor, inténtalo de nuevo.");
    }
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
          required
        ></textarea>
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}

export default TaskForm;