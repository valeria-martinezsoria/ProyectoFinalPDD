import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import TaskService from "../servicesFacade/TaskService";
import TaskForm from "./TaskForm";
import DragAndDrop from "./DragAndDrop";

function TaskList() {
  const [tasks, setTasks] = useState({
    pending: [],
    "in-progress": [],
    done: [],
  });

  // Obtener las tareas al cargar el componente
  useEffect(() => {
    TaskService.getAll()
      .then((data) => {
        // Organizar las tareas por estado
        const organizedTasks = {
          pending: data.filter((task) => task.status === "pending"),
          "in-progress": data.filter((task) => task.status === "in-progress"),
          done: data.filter((task) => task.status === "done"),
        };
        setTasks(organizedTasks);
      })
      .catch((error) => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  // Función para agregar una nueva tarea al estado local
  const handleTaskAdded = (newTask) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [newTask.status]: [...prevTasks[newTask.status], newTask],
    }));
  };

  // Manejar el evento de arrastrar y soltar
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Si no hay destino o si el destino es el mismo que el origen, no hacer nada
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    const sourceColumn = tasks[source.droppableId];
    const destColumn = tasks[destination.droppableId];
    const [movedTask] = sourceColumn.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Mover dentro de la misma columna
      sourceColumn.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
      });
    } else {
      // Mover a otra columna
      movedTask.status = destination.droppableId; // Actualizar el estado de la tarea
      destColumn.splice(destination.index, 0, movedTask);
      setTasks({
        ...tasks,
        [source.droppableId]: sourceColumn,
        [destination.droppableId]: destColumn,
      });

      // Actualizar el estado en el backend
      TaskService.update(movedTask.id, movedTask)
        .then(() => {
          console.log("Task updated successfully");
        })
        .catch((error) => {
          console.error("Error updating task:", error);
          // Revertir el cambio en el frontend si la actualización en el backend falla
          setTasks((prevTasks) => ({
            ...prevTasks,
            [source.droppableId]: [...sourceColumn, movedTask],
            [destination.droppableId]: destColumn.filter((task) => task.id !== movedTask.id),
          }));
        });
    }
  };

  // Manejar la eliminación de una tarea
  const handleDelete = (id) => {
    TaskService.delete(id)
      .then(() => {
        const updatedTasks = {
          pending: tasks.pending.filter((task) => task.id !== id),
          "in-progress": tasks["in-progress"].filter((task) => task.id !== id),
          done: tasks.done.filter((task) => task.id !== id),
        };
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.error("Error deleting task:", error);
      });
  };

  return (
    <div>
      <TaskForm onTaskAdded={handleTaskAdded} /> {/* Pasa la función como prop */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {Object.entries(tasks).map(([columnId, columnTasks]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    width: "30%",
                    padding: "16px",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                >
                  <h3>{columnId.toUpperCase()}</h3>
                  {columnTasks.map((task, index) => (
                    <Draggable draggableId={task.id.toString()} index={index} key={task.id}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: "8px",
                            margin: "8px 0",
                            backgroundColor: "#f4f4f4",
                            border: "1px solid #ddd",
                            borderRadius: "4px",
                            ...provided.draggableProps.style,
                          }}
                        >
<span className={`status-icon ${task.status}`}></span>
<strong>{task.title}</strong> - {task.description}
<button
  onClick={() => handleDelete(task.id)}
  style={{
    marginLeft: "8px",
    backgroundColor: "#ff4d4d", // Fondo rojo
    color: "white", // Texto blanco
    border: "none", // Sin borde
    borderRadius: "4px", // Bordes redondeados
    padding: "6px 12px", // Padding para mejor aspecto
    cursor: "pointer", // Cursor tipo pointer
    transition: "background-color 0.3s ease", // Transición suave
  }}
  onMouseOver={(e) => (e.target.style.backgroundColor = "#cc0000")} // Efecto hover
  onMouseOut={(e) => (e.target.style.backgroundColor = "#ff4d4d")} // Restaurar color
>
  Eliminar
</button>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default TaskList;