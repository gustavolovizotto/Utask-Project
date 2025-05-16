import React, { useState } from 'react';
import styles from './taskForm.module.css';

export default function TaskForm({ onSubmit, onCancel, userId, isDarkMode }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [column, setColumn] = useState('todo');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      column,
      userId,
    });
    setTitle('');
    setDescription('');
  };

  return (
    <div className={styles.overlay}>
      <div className={`${styles.modal} ${isDarkMode ? styles.dark : ''}`}>
        <form
          className={`${styles.form} ${isDarkMode ? styles.dark : ''}`}
          onSubmit={handleSubmit}
        >
          <div className={styles.header}>
            <img
              src="/assets/Título form kanvan.svg"
              alt="Título"
              className={styles.title}
            />
            <img
              src="/assets/[Botão] Fechar.svg"
              alt="Fechar"
              onClick={onCancel}
              className={styles.closeButton}
            />
          </div>
          <label>
            Título *
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>
          <label>
            Descrição
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label>
            Coluna
            <select value={column} onChange={(e) => setColumn(e.target.value)}>
              <option value="todo">A fazer</option>
              <option value="inProgress">Em andamento</option>
              <option value="done">Feito</option>
            </select>
          </label>
          <div className={styles.buttons}>
            <button type="submit">Criar Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
