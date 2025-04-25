import { useState } from 'react';
import styles from './signupForm.module.css';
import { useNavigate } from 'react-router-dom';

export function SignUpForm({ isDarkMode }) {
    const [mostrarSenha, setMostrarSenha] = useState(true);
        
          const toggleSenha = () => {
            setMostrarSenha(!mostrarSenha);
          };
    const navigate = useNavigate();
    const handlenavigate = (e) => {
        e.preventDefault();
        navigate('/MainPage');
    };
return (
<form className={`${styles.form} ${isDarkMode ? styles.dark : ''}`}>
                 <span className={styles.logo}>uTask 3.0</span>
                 <img src='/src/assets/Divisor 2 login.svg' alt="Divisor" className={styles.divisor2}/>
                 <div className={styles.senha_wrapper}>
                 <h1>Crie uma conta</h1>
                     <label className={styles.label} htmlFor="name">Nome de usuário</label>
                     <input
                     className={styles.input}
                     type="text"
                     id="name"
                     name="name"
                     placeholder="Seu nome de usuário"
                     required
                     />
                 </div>
                 
                 <div className={styles.senha_wrapper}>
                     <label className={styles.label} htmlFor="email">E-mail</label>
                     <input
                     className={styles.input}
                     type="email"
                     id="email"
                     name="email"
                     placeholder="Endereço de e-mail"
                     required
                     />
                 </div>
                 
                 <div className={styles.senha_wrapper}>
                             <label className={styles.label} htmlFor="senha">Senha</label>
                             <input
                               className={styles.input}
                               type={mostrarSenha ? 'text' : 'password'}
                               id="senha"
                               name="senha"
                               placeholder="Senha"
                               required
                             />
                             <button
                               type="button"
                               className={styles.senha_toggle}
                               onClick={toggleSenha}
                             >
                               <img
                                 src={
                                   mostrarSenha
                                     ? '/src/assets/visibility_FILL-icon.svg'
                                     : '/src/assets/visibility_FILL0-icon.svg'
                                 }
                                 alt="Toggle senha"
                               />
                             </button>
                           </div>
   
                 <div className={styles.senha_wrapper}>
                             <label className={styles.label} htmlFor="senha">Confirme a senha</label>
                             <input
                               className={styles.input}
                               type={mostrarSenha ? 'text' : 'password'}
                               id="senha"
                               name="senha"
                               placeholder="Senha"
                               required
                             />
                             <button
                               type="button"
                               className={styles.senha_toggle}
                               onClick={toggleSenha}
                             >
                               <img
                                 src={
                                   mostrarSenha
                                     ? '/src/assets/visibility_FILL-icon.svg'
                                     : '/src/assets/visibility_FILL0-icon.svg'
                                 }
                                 alt="Toggle senha"
                               />
                             </button>
                           </div>
                 <button type="submit" onClick={handlenavigate} className={styles.signup_btn}>Criar Cadastro</button>
                 </form>
  );
}
