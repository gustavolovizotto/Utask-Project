import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import KanbanCard from './kanbanCard';
import styles from './KanbanColumn.module.css';

export default function KanbanColumn({
  id,
  items,
  tasksInfo,
  onDelete,
  onMoveNext,
  onMovePrevious,
  isDarkMode,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`${styles.column} ${isOver ? styles.over : ''} ${isDarkMode ? styles.dark : ''}`}
    >
      {items.map((itemId) => (
        <KanbanCard
          key={itemId}
          task={tasksInfo[itemId]}
          onDelete={onDelete}
          onMoveNext={onMoveNext}
          onMovePrevious={onMovePrevious}
          isDarkMode={isDarkMode}
        />
      ))}
    </div>
  );
}
