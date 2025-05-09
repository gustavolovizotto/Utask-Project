import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import KanbanColumn from './kanbanColumn';
import TaskForm from './taskForm';
import styles from './kanbanBoard.module.css';

const initialColumns = {
  todo: [],
  inProgress: [],
  done: [],
};

export default function KanbanBoard({ isDarkMode, userId }) {
  const [columns, setColumns] = useState(initialColumns);
  const [tasksInfo, setTasksInfo] = useState({});
  const [formOpen, setFormOpen] = useState(false);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const handleAddClick = () => setFormOpen(true);
  const handleCancel = () => setFormOpen(false);

  const handleSubmit = ({ title, description, column }) => {
    api
      .post('/tasks', { title, description, column, usuarioId: userId })
      .then(({ data: newTask }) => {
        setTasksInfo((prev) => ({ ...prev, [newTask.id]: newTask }));
        setColumns((prev) => ({
          ...prev,
          [column]: [...prev[column], newTask.id],
        }));
        setFormOpen(false);
      })
      .catch((err) => console.error('Erro ao criar task:', err));
  };

  const onDragEnd = ({ active, over }) => {
    if (!over) return;
    const from = Object.keys(columns).find((col) =>
      columns[col].includes(active.id),
    );
    const to =
      over.id in columns
        ? over.id
        : Object.keys(columns).find((col) => columns[col].includes(over.id));
    if (!from || !to) return;
    setColumns((prev) => {
      const updated = { ...prev };
      if (from === to) {
        updated[from] = arrayMove(
          prev[from],
          prev[from].indexOf(active.id),
          prev[from].indexOf(over.id),
        );
      } else {
        updated[from] = prev[from].filter((id) => id !== active.id);
        updated[to] = [...prev[to], active.id];
      }
      return updated;
    });

    api
      .patch(`/tasks/${active.id}`, { column: to })
      .catch((err) => console.error('Erro ao mover task:', err));
  };

  const handleMoveNext = (taskId) => {
    // Descobre coluna atual
    const fromCol = Object.keys(columns).find((col) =>
      columns[col].includes(taskId),
    );
    // Define ordem fixa de colunas
    const order = ['todo', 'inProgress', 'done'];
    const idx = order.indexOf(fromCol);
    if (idx === -1 || idx === order.length - 1) return; // se já estiver em 'done', não faz nada

    const toCol = order[idx + 1];

    // Atualiza local
    setColumns((prev) => {
      const updated = { ...prev };
      updated[fromCol] = prev[fromCol].filter((id) => id !== taskId);
      updated[toCol] = [...prev[toCol], taskId];
      return updated;
    });

    // Atualiza backend
    api.patch(`/tasks/${taskId}`, { column: toCol }).catch(console.error);
  };

  const handleMovePrevious = (taskId) => {
    // Encontra a coluna atual da task
    const fromCol = Object.keys(columns).find((col) =>
      columns[col].includes(taskId),
    );

    // Ordem das colunas (agora importante para a direção)
    const order = ['todo', 'inProgress', 'done'];
    const idx = order.indexOf(fromCol);

    // Não faz nada se já estiver na primeira coluna
    if (idx <= 0) return;

    const toCol = order[idx - 1]; // Pega a coluna anterior

    // Atualiza o estado local
    setColumns((prev) => {
      const updated = { ...prev };
      updated[fromCol] = prev[fromCol].filter((id) => id !== taskId);
      updated[toCol] = [...prev[toCol], taskId]; // Adiciona no início se quiser
      return updated;
    });

    // Atualiza o backend
    api.patch(`/tasks/${taskId}`, { column: toCol }).catch(console.error);
  };

  const handleDelete = (taskId) => {
    if (window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      api
        .delete(`/tasks/${taskId}`)
        .then(() => {
          setColumns((prev) => {
            const updated = { ...prev };
            Object.keys(updated).forEach((col) => {
              updated[col] = updated[col].filter((id) => id !== taskId);
            });
            return updated;
          });

          setTasksInfo((prev) => {
            const { [taskId]: deleted, ...rest } = prev;
            return rest;
          });

          toast.success('Tarefa excluída com sucesso!', {
            position: 'top-right',
            autoClose: 2000,
          });
        })
        .catch((err) => {
          console.error('Erro ao deletar:', err);
          toast.error('Erro ao excluir a tarefa!', {
            position: 'top-right',
            autoClose: 2000,
          });
        });
    }
  };

  useEffect(() => {
    api
      .get('/tasks', {
        params: {
          usuarioId: userId, // Filtro normal
        },
      })
      .then(({ data }) => {
        const cols = { todo: [], inProgress: [], done: [] };
        const info = {};
        data.forEach((task) => {
          cols[task.column].push(task.id);
          info[task.id] = task;
        });
        setColumns(cols);
        setTasksInfo(info);
      })
      .catch((err) => console.error('Erro ao carregar tasks:', err));
  }, [userId]); // Adicione userId como dependência

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.tableTitles}>
        <div className={styles.todoTitle}>
          <h2>A fazer</h2>
          <button className={styles.addButton} onClick={handleAddClick}>
            <img
              src="/assets/[Botão] Adicionar task.svg"
              alt="Adicionar tarefa"
            />
          </button>
          {formOpen && (
            <TaskForm
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              userId={userId}
            />
          )}
        </div>
        <div className={styles.inProgressTitle}>
          <h2>Em andamento</h2>
        </div>
        <div className={styles.doneTitle}>
          <h2>Feito</h2>
        </div>
      </div>
      <div className={styles.wrapper}>
        <ToastContainer />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          <div className={styles.board}>
            <SortableContext
              items={columns.todo}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                id="todo"
                title="A fazer"
                items={columns.todo}
                tasksInfo={tasksInfo}
                onDelete={handleDelete}
                onMoveNext={handleMoveNext}
                isDarkMode={isDarkMode}
              />
            </SortableContext>
            <SortableContext
              items={columns.inProgress}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                id="inProgress"
                title="Em andamento"
                items={columns.inProgress}
                tasksInfo={tasksInfo}
                onDelete={handleDelete}
                onMoveNext={handleMoveNext}
                onMovePrevious={handleMovePrevious}
                isDarkMode={isDarkMode}
              />
            </SortableContext>
            <SortableContext
              items={columns.done}
              strategy={verticalListSortingStrategy}
            >
              <KanbanColumn
                id="done"
                title="Feito"
                items={columns.done}
                tasksInfo={tasksInfo}
                onDelete={handleDelete}
                onMoveNext={handleMoveNext}
                onMovePrevious={handleMovePrevious}
                isDarkMode={isDarkMode}
              />
            </SortableContext>
          </div>
        </DndContext>
      </div>
    </div>
  );
}
