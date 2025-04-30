
import styles from './header.module.css';

export function Header({ isDarkMode, toggleDarkMode }) {
  return (
    <div className={styles.header} style={{ '--header-bg': isDarkMode ? '#333' : '#226ED8' }}>
        
        
        <img
          src={
            isDarkMode
              ? '/src/assets/[Imagem] Logo azul unect (1).svg'
              : '/src/assets/[Imagem] Logo branca.svg'
          }
          alt="Logo Unect"
        />

        <h1 className={styles.title} style={{ '--header-text-color': isDarkMode ? '#226ED8' : '#FAFAFA' }}>uTask 3.0</h1>
    


      <button
        type="button"
        className={styles.darkmode_toggle}
        onClick={toggleDarkMode}
      >
        <img
          src={
            isDarkMode
              ? '/src/assets/[Botão] dark mode (1).svg'
              : '/src/assets/[Botão] Light mode.svg'
          }
          alt="Toggle dark mode"
        />
      </button>
    </div>
  );
}