import React from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const DragAndDrop = ({ tasks, onTaskMove }) => {
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Si no hay destino o si el destino es el mismo que el origen, no hacer nada
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    // Llamar a la función onTaskMove para actualizar el estado en el componente padre
    onTaskMove(source, destination);
  };

  // Función para obtener el color de fondo según el estado de la tarea
  const getTaskBackgroundColor = (columnId) => {
    switch (columnId) {
      case 'PENDING':
        return '#f39c12'; // Naranja
      case 'IN_PROGRESS':
        return '#3498db'; // Celeste
      case 'DONE':
        return '#2ecc71'; // Verde
      default:
        return '#f4f4f4'; // Color por defecto
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
        {Object.keys(tasks).map((columnId) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  width: '30%',
                  padding: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  backgroundColor: '#f9f9f9',
                }}
              >
                <h2 style={{ textAlign: 'center', marginBottom: '16px', color: '#333' }}>{columnId}</h2>
                {tasks[columnId].map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '12px',
                          margin: '8px 0',
                          backgroundColor: getTaskBackgroundColor(columnId),
                          border: '1px solid #ddd',
                          borderRadius: '6px',
                          color: '#fff',
                          fontWeight: '500',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task.content}
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
  );
};

export default DragAndDrop;