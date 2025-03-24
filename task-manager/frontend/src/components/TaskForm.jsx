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
    <div style={{ marginBottom: '20px' }}>
      <div className="title-container">
        <h1 className="title">Gestor de Tareas:</h1>
      </div>
        <h3 style={{ textAlign: 'center', color: '#568281' }}>Agrega una nueva tarea: 🗒️</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd' }}
        />
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: '10px', borderRadius: '4px', border: '1px solid #ddd', resize: 'vertical' }}
        ></textarea>
        <button type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#3b99ba',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >Agregar
        </button>
      </form>
    </div>
  );
}

export default TaskForm;