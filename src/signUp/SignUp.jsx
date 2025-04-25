import styles from './signUp.module.css';
import { SignUpForm } from '../components/signupForm/SignupForm';

export function SignUp() {

    return (
    <div className={styles.container}>
        <div className={styles.header} />
          <div className={styles.content}>

            <SignUpForm/>

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