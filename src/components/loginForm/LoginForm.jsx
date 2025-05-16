import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './loginForm.module.css';
import { loginUsuario } from '../../services/api';
import { useAuth } from '../../auth/AuthContext';

export function LoginForm({ isDarkMode, setIsAuthenticated }) {
  const [mostrarSenha, setMostrarSenha] = useState(true);
  const [credenciais, setCredenciais] = useState({
    email: '',
    senha: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredenciais({
      ...credenciais,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!credenciais.email || !credenciais.senha) {
        throw new Error('Preencha todos os campos');
      }

      const usuario = await loginUsuario(credenciais);

      if (!usuario) {
        throw new Error('Credenciais inválidas');
      }

      login(usuario);

      toast.success('Login realizado com sucesso!', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: true,
        theme: isDarkMode ? 'dark' : 'light',
      });

      setIsAuthenticated(true);
      setTimeout(() => {
        navigate('/MainPage');
      }, 2000);
    } catch (error) {
      toast.error(error.message, {
        position: 'top-center',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className={`${styles.form} ${isDarkMode ? styles.dark : ''}`}
        onSubmit={handleSubmit}
      >
        <span className={styles.logo}>uTask 3.0</span>

        <div className={styles.senha_wrapper}>
          <label className={styles.label} htmlFor="email">
            E-mail
          </label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            placeholder="Endereço de e-mail"
            value={credenciais.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.senha_wrapper}>
          <label className={styles.label} htmlFor="senha">
            Senha
          </label>
          <input
            className={styles.input}
            type={mostrarSenha ? 'text' : 'password'}
            id="senha"
            name="senha"
            placeholder="Senha"
            value={credenciais.senha}
            onChange={handleChange}
            required
            minLength="6"
          />
          <button
            type="button"
            className={styles.senha_toggle}
            onClick={toggleSenha}
          >
            <img
              src={
                mostrarSenha
                  ? '/assets/visibility_FILL-icon.svg'
                  : '/assets/visibility_FILL0-icon.svg'
              }
              alt="Ocultar senha"
            />
          </button>

          <Link to="/forgot-password" className={styles.esqueceu_senha}>
            Esqueceu a senha?
          </Link>
        </div>

        <button className={styles.entrar_btn} type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar'}
        </button>

        <img
          className={styles.divisor2}
          src="/assets/Divisor 2 login.svg"
          alt="Divisória"
        />

        <Link to="/signup" className={styles.crie_conta}>
          Não tem cadastro? Crie uma conta
        </Link>
      </form>

      <ToastContainer />
    </>
  );
}
