import styles from './login.module.css';
import { LoginForm } from '../components/loginForm/LoginForm';
import { useState } from 'react';
import { FirstHeader } from '../components/header/FirstHeader';

export function Login() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>

      <FirstHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

      <div className={styles.content}>
        <div className={styles.leftSide}>
          <img 
            className={styles.imagem1} 
            src="/assets/Ilustração do login.svg" 
            alt="Ilustração do login" 
          />
        </div>

        <img 
          className={styles.divisor1} 
          src="/assets/Divisor 1 login.svg" 
          alt="Divisor" 
        />

        <LoginForm isDarkMode={isDarkMode}
        setIsAuthenticated={setIsAuthenticated}
        />
        
      </div>
    </div>
  );
}