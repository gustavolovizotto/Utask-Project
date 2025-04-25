import React from 'react';
import styles from './loginForm.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export function LoginForm({ isDarkMode }) {
    const [mostrarSenha, setMostrarSenha] = useState(true);
    
    const toggleSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    return (
        <form className={`${styles.form} ${isDarkMode ? styles.dark : ''}`}>
            <span className={styles.logo}>uTask 3.0</span>
            
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

                <a className={styles.esqueceu_senha} href="#">Esqueceu a senha?</a>
            </div>
    
            <button className={styles.entrar_btn} type="submit">Entrar</button>
            <img 
                className={styles.divisor2} 
                src="/src/assets/Divisor 2 login.svg" 
                alt="Google" 
            />
            <Link to="/signup" className={styles.crie_conta}>
                Não tem cadastro? Crie uma conta
            </Link>
        </form>
    );
}