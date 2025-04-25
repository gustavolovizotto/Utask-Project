import styles from './signUp.module.css';
import { SignUpForm } from '../components/signupForm/SignupForm';
import { useState } from 'react';
import { FirstHeader } from '../components/header/FirstHeader';

export function SignUp() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  
    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
    };


    return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
        <FirstHeader isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
          <div className={styles.content}>

            <SignUpForm isDarkMode={isDarkMode}/>

              <img 
              className={styles.divisor1} 
              src="/src/assets/Divisor 1 login.svg" 
              alt="Divisor" 
              />

<div className={styles.rightSide}>
              <img 
                  className={styles.logo2} 
                  src="/src/assets/Ilustração cadastro.svg" 
                  alt="Logo" 
              />
              </div>
      </div>

      

    
     </div>)
    
}