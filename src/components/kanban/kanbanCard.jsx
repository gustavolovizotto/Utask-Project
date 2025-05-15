import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styles from './KanbanCard.module.css';

export default function KanbanCard({
  task,
  onDelete,
  onMoveNext,
  onMovePrevious,
  isDarkMode,
  onMoveToFirst,
}) {
  const [openDesc, setOpenDesc] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`${styles.card} ${isDarkMode ? styles.dark : ''} ${openDesc ? styles.expanded : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className={`${styles.top} ${isDarkMode ? styles.dark : ''}`}>
        <div className={`${styles.title} ${isDarkMode ? styles.dark : ''}`}>
          {task.title}
        </div>
        <button
          className={`${styles.menuButton} ${isDarkMode ? styles.dark : ''}`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <div
            className={`${styles.trespontos} ${isDarkMode ? styles.dark : ''}`}
          >
            ⋮
          </div>
        </button>
        {menuOpen && (
          <div className={`${styles.menu} ${isDarkMode ? styles.dark : ''}`}>
            <span className={styles.delbtn} onClick={() => onDelete(task.id)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 0 24 24"
                width="1.2vw"
              >
                <path d="M0 0h24v24H0V0z" fill="none" />
                <path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z" />
              </svg>
              <p>Excluir</p>
            </span>
          </div>
        )}
      </div>

      <button
        className={`${styles.toggle} ${isDarkMode ? styles.dark : ''}`}
        onClick={() => setOpenDesc((o) => !o)}
      >
        {openDesc ? 'Esconder descrição ▲' : 'Ler descrição ▼'}
      </button>
      {openDesc && task.description && (
        <p
          className={`${styles.desc} ${openDesc ? styles.open : ''} ${isDarkMode ? styles.dark : ''}`}
        >
          {task.description}
        </p>
      )}

      <div
        className={`
    ${styles.actions}
    ${isDarkMode ? styles.dark : ''}
    ${task.column === 'todo' ? styles.todoActions : ''}
  `}
      >
        {task.column === 'todo' && (
          <img
            onClick={() => onMoveNext(task.id)}
            src={
              isDarkMode
                ? '/assets/[Botão] Próximo (1) dark.svg'
                : '/assets/[Botão] Próximo.svg'
            }
            alt="Próximo"
          />
        )}

        {task.column === 'inProgress' && (
          <>
            <img
              onClick={() => onMovePrevious(task.id)}
              src={
                isDarkMode
                  ? '/assets/[Botão] Voltar (1) dark.svg'
                  : '/assets/[Botão] Voltar.svg'
              }
              alt="Voltar"
            />
            <img
              onClick={() => onMoveNext(task.id)}
              src={
                isDarkMode
                  ? '/assets/[Botão] Próximo (1) dark.svg'
                  : '/assets/[Botão] Próximo.svg'
              }
              alt="Próximo"
            />
          </>
        )}

        {task.column === 'done' && (
          <>
            <img
              onClick={() => onMovePrevious(task.id)}
              src={
                isDarkMode
                  ? '/assets/[Botão] Voltar (1) dark.svg'
                  : '/assets/[Botão] Voltar.svg'
              }
              alt="Voltar"
            />
            <img
              onClick={() => onMoveToFirst(task.id)}
              src={
                isDarkMode
                  ? '/assets/[Botão] retornar prmeiro dark.svg'
                  : '/assets/[Botão] retornar primeiro light.svg'
              }
              alt="Retornar para a primeira coluna"
            />
          </>
        )}
      </div>
    </div>
  );
}
