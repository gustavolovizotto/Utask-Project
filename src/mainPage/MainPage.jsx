import AdviceGenerator from '../components/advice/AdviceGenerator';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import styles from './mainPage.module.css';
import KanbanBoard from '../components/kanban/kanbanBoard';
import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Navigate } from 'react-router-dom';

export function MainPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <div className={styles.content}>
        <AdviceGenerator isDarkMode={isDarkMode} />
        <KanbanBoard userId={user.id} isDarkMode={isDarkMode} />
      </div>
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
