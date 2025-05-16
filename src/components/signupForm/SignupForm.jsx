import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './signupForm.module.css';
import { useNavigate } from 'react-router-dom';
import { cadastrarUsuario } from '../../services/api';

export function SignUpForm({ isDarkMode }) {
  const [mostrarSenha, setMostrarSenha] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: '',
  });
  const [erro, setErro] = useState('');
  const [senhaError, setSenhaError] = useState(false);
  const navigate = useNavigate();

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'senha' || name === 'confirmarSenha') {
      const senha = name === 'senha' ? value : formData.senha;
      const confirmar =
        name === 'confirmarSenha' ? value : formData.confirmarSenha;
      setSenhaError(senha !== confirmar && confirmar.length > 0);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.senha !== formData.confirmarSenha) {
      setSenhaError(true);
      setErro('Senhas não coincidem');
      return;
    }

    try {
      await cadastrarUsuario({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      });

      toast.success(
        <div className={styles.toastContent}>
          <h3 className={styles.toastTitle}>Cadastro realizado com sucesso!</h3>
          <p className={styles.toastMessage}>
            Redirecionando para a página principal...
          </p>
        </div>,
        {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: isDarkMode ? 'dark' : 'light',
          className: styles.customToast,
        },
      );

      setTimeout(() => {
        navigate('/MainPage');
      }, 3000);
    } catch (error) {
      setErro(error.message);
      toast.error(`Erro: ${error.message}`, {
        position: 'top-center',
      });
    }
  };

  return (
    <>
      <form
        className={`${styles.form} ${isDarkMode ? styles.dark : ''}`}
        onSubmit={handleSubmit}
      >
        <span className={styles.logo}>uTask 3.0</span>
        <img
          src="/assets/Divisor 2 login.svg"
          alt="Divisor"
          className={styles.divisor2}
        />

        {erro && <div className={styles.erro}>{erro}</div>}

        <div className={styles.senha_wrapper}>
          <h1>Crie uma conta</h1>
          <label className={styles.label} htmlFor="nome">
            Nome de usuário
          </label>
          <input
            className={styles.input}
            type="text"
            id="nome"
            name="nome"
            placeholder="Seu nome de usuário"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </div>

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
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.senha_wrapper}>
          <label className={styles.label} htmlFor="senha">
            Senha
          </label>
          <input
            className={`${styles.input} ${senhaError ? styles.inputError : ''}`}
            type={mostrarSenha ? 'text' : 'password'}
            id="senha"
            name="senha"
            placeholder="Senha"
            value={formData.senha}
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
              alt="Toggle senha"
            />
          </button>
        </div>

        <div className={styles.senha_wrapper}>
          <label className={styles.label} htmlFor="confirmarSenha">
            Confirme a senha
          </label>
          <input
            className={`${styles.input} ${senhaError ? styles.inputError : ''}`}
            type={mostrarSenha ? 'text' : 'password'}
            id="confirmarSenha"
            name="confirmarSenha"
            placeholder="Confirme sua senha"
            value={formData.confirmarSenha}
            onChange={handleChange}
            required
          />
          {senhaError && (
            <span className={styles.errorMessage}>
              Senhas não combinam, tente novamente
            </span>
          )}
        </div>

        <button type="submit" className={styles.signup_btn}>
          Criar Cadastro
        </button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDarkMode ? 'dark' : 'light'}
        toastClassName={styles.customToastWrapper}
        bodyClassName={styles.customToastBody}
      />
    </>
  );
}
