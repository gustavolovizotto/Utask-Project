import React from 'react';
import { useDroppable } from '@dnd-kit/core';                 // hook droppable :contentReference[oaicite:7]{index=7}
import KanbanCard from './kanbanCard';
import styles from './KanbanColumn.module.css';

export default function KanbanColumn({ id, items, tasksInfo, onDelete, onMoveNext }) {
  const { setNodeRef, isOver } = useDroppable({ id });       // expõe isOver para estilizar :contentReference[oaicite:8]{index=8}
  

  return (
    <div ref={setNodeRef} className={`${styles.column} ${isOver ? styles.over : ''}`}>
      
      {items.map(itemId => (
        <KanbanCard key={itemId} task={tasksInfo[itemId]} onDelete={onDelete} onMoveNext={onMoveNext}/>
      ))}
    </div>
  );
}
