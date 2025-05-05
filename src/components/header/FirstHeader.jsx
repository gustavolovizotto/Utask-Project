// components/Header/Header.jsx
import styles from './firstHeader.module.css';

export function FirstHeader({ isDarkMode, toggleDarkMode }) {
  return (
    <div 
  className={styles.header}
  style={{ '--header-bg': isDarkMode ? '#333' : '#226ED8' }}
>
      <button
        type="button"
        className={styles.darkmode_toggle}
        onClick={toggleDarkMode}
      >
        <img
          src={
            isDarkMode
              ? '/assets/[Botão] dark mode (1).svg'
              : '/assets/[Botão] Light mode.svg'
          }
          alt="Toggle dark mode"
        />
      </button>
    </div>
  );
}