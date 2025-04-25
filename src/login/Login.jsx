import styles from './login.module.css';
import { LoginForm } from '../components/loginForm/LoginForm';

export function Login() {

  return (
    <div className={styles.container}>
      <div className={styles.header} />
      
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <img 
            className={styles.imagem1} 
            src="/src/assets/Ilustração do login.svg" 
            alt="Ilustração do login" 
          />
        </div>

        <img 
          className={styles.divisor1} 
          src="/src/assets/Divisor 1 login.svg" 
          alt="Divisor" 
        />

        <LoginForm />
        
      </div>
    </div>
  );
}