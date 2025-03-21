import React, { useState } from 'react';
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
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
                  borderRadius: '4px',
                }}
              >
                <h2>{columnId}</h2>
                {tasks[columnId].map((task, index) => (
                  <Draggable draggableId={task.id} index={index} key={task.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: '8px',
                          margin: '8px 0',
                          backgroundColor: '#f4f4f4',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
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