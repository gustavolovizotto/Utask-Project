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

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

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

  const isMobile = useIsMobile(900);

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
    const fromCol = Object.keys(columns).find((col) =>
      columns[col].includes(taskId),
    );

    const order = ['todo', 'inProgress', 'done'];
    const idx = order.indexOf(fromCol);
    if (idx === -1 || idx === order.length - 1) return;

    const toCol = order[idx + 1];

    setColumns((prev) => {
      const updated = { ...prev };
      updated[fromCol] = prev[fromCol].filter((id) => id !== taskId);
      updated[toCol] = [...prev[toCol], taskId];
      return updated;
    });

    setTasksInfo((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        column: toCol,
      },
    }));

    api.patch(`/tasks/${taskId}`, { column: toCol }).catch(console.error);
  };

  const handleMovePrevious = (taskId) => {
    const fromCol = Object.keys(columns).find((col) =>
      columns[col].includes(taskId),
    );

    const order = ['todo', 'inProgress', 'done'];
    const idx = order.indexOf(fromCol);

    if (idx <= 0) return;

    const toCol = order[idx - 1];

    setColumns((prev) => {
      const updated = { ...prev };
      updated[fromCol] = prev[fromCol].filter((id) => id !== taskId);
      updated[toCol] = [...prev[toCol], taskId];
      return updated;
    });

    setTasksInfo((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        column: toCol,
      },
    }));

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

  const handleMoveToFirst = (taskId) => {
    const fromCol = Object.keys(columns).find((col) =>
      columns[col].includes(taskId),
    );
    if (!fromCol || fromCol === 'todo') return;

    setColumns((prev) => {
      const updated = { ...prev };
      updated[fromCol] = prev[fromCol].filter((id) => id !== taskId);
      updated['todo'] = [...prev['todo'], taskId];
      return updated;
    });

    setTasksInfo((prev) => ({
      ...prev,
      [taskId]: {
        ...prev[taskId],
        column: 'todo',
      },
    }));

    api.patch(`/tasks/${taskId}`, { column: 'todo' }).catch(console.error);
  };

  const [activeColumn, setActiveColumn] = useState(0);
  const columnOrder = ['todo', 'inProgress', 'done'];

  const handlePrev = () => {
    setActiveColumn(
      (prev) => (prev - 1 + columnOrder.length) % columnOrder.length,
    );
  };

  const handleNext = () => {
    setActiveColumn((prev) => (prev + 1) % columnOrder.length);
  };

  useEffect(() => {
    api
      .get('/tasks', {
        params: {
          usuarioId: userId,
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
  }, [userId]);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.wrapper}>
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
                isDarkMode={isDarkMode}
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
        <ToastContainer />
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={onDragEnd}
        >
          {isMobile ? (
            <>
              <div className={styles.mobileHeader}>
                {columnOrder[activeColumn] === 'todo' && (
                  <div className={styles.todoTitleMobile}>
                    <h2 className={styles.mobileTitle}>A fazer</h2>
                    <button
                      className={styles.addButton}
                      onClick={handleAddClick}
                    >
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
                        isDarkMode={isDarkMode}
                      />
                    )}
                  </div>
                )}
                {columnOrder[activeColumn] === 'inProgress' && (
                  <h2 className={styles.mobileTitle}>Em andamento</h2>
                )}
                {columnOrder[activeColumn] === 'done' && (
                  <h2 className={styles.mobileTitle}>Feito</h2>
                )}
              </div>
              <div className={styles.carouselContent}>
                <div className={styles.carouselRow}>
                  <button className={styles.arrowBtn} onClick={handlePrev}>
                    <img
                      src="/assets/navigate_before light.svg"
                      alt="Seta Anterior"
                    />
                  </button>
                  <div className={styles.carouselContainer}>
                    <KanbanColumn
                      id={columnOrder[activeColumn]}
                      title={
                        columnOrder[activeColumn] === 'todo'
                          ? 'A fazer'
                          : columnOrder[activeColumn] === 'inProgress'
                            ? 'Em andamento'
                            : 'Feito'
                      }
                      items={columns[columnOrder[activeColumn]]}
                      tasksInfo={tasksInfo}
                      onDelete={handleDelete}
                      onMoveNext={handleMoveNext}
                      onMovePrevious={handleMovePrevious}
                      isDarkMode={isDarkMode}
                      onMoveToFirst={handleMoveToFirst}
                    />
                  </div>
                  <button className={styles.arrowBtn} onClick={handleNext}>
                    <img
                      src="/assets/navigate_next light.svg"
                      alt="Seta Próximo"
                    />
                  </button>
                </div>
                <div className={styles.indicators}>
                  {columnOrder.map((_, idx) => (
                    <span
                      key={idx}
                      className={`${styles.dot} ${activeColumn === idx ? styles.active : ''}`}
                      onClick={() => setActiveColumn(idx)}
                    />
                  ))}
                </div>
              </div>
            </>
          ) : (
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
                  onMoveToFirst={handleMoveToFirst}
                />
              </SortableContext>
            </div>
          )}
        </DndContext>
      </div>
    </div>
  );
}
