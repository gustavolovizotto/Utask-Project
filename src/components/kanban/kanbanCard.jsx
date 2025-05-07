import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './KanbanCard.module.css';

export default function KanbanCard({ task, onDelete }) {
  const [openDesc, setOpenDesc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

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
            <img 
              className={styles.del} 
              onClick={() => onDelete(task.id)}  // Use a prop aqui
              src='/assets/PopUp Excluir.svg' 
              alt='Deletar tarefa' 
            />
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
