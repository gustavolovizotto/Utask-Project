import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './KanbanCard.module.css';
import api from '../../services/api'; 

export default function KanbanCard({ task, setColumns }) {
  const [openDesc, setOpenDesc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  const handleDelete = (taskId) => {
    api.delete(`/tasks/${taskId}`)
      .then(() => {
        setColumns(prev => {
          const updated = {};
          for (const col in prev) {
            updated[col] = prev[col].filter(id => id !== taskId);
          }
          return updated;
        });
        
        
      })
      .catch(err => console.error('Erro ao deletar task:', err));
  };

  return (
    <div ref={setNodeRef} style={style} className={styles.card} {...attributes} {...listeners}>
      <div className={styles.top}>
        <div className= {styles.title}>{task.title}</div> 
        <button
          className={styles.menuButton}
          onClick={() => setMenuOpen(open => !open)}
        >
          ⋮
        </button>
        {menuOpen && (
          <div className={styles.menu}>
              <img className={styles.del} onClick={handleDelete} src='/public/assets/PopUp Excluir.svg' alt='Deletar tarefa' />
          </div>
        )}
      </div>

      <button className={styles.toggle} onClick={() => setOpenDesc(o => !o)}>
        {openDesc ? 'Esconder descrição ▲' : 'Ler descrição ▼'}
      </button>
      {openDesc && task.description && (
        <p className={styles.desc}>{task.description}</p>
      )}

      <div className={styles.actions}>
        <img   src='/assets/[Botão] Próximo.svg'/>
      </div>
    </div>
  );
}
