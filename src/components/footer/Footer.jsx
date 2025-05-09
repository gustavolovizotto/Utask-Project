import styles from './footer.module.css';
export function Footer({ isDarkMode }) {
  return (
    <footer>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
        <p>
          © Processo de Trainee{' '}
          <a target="_blank" href="https://unect.com.br/ ">
            Unect Jr.
          </a>
        </p>

        <p>
          Feito com ❤ por{' '}
          <a target="_blank" href="https://github.com/gustavolovizotto">
            Gustavo Tesin
          </a>
        </p>
      </div>
    </footer>
  );
}
