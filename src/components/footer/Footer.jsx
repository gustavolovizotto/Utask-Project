import styles from'./footer.module.css';
export function Footer ()  {
    return(
        <footer>
            <div className={styles.container}>
                <img src="/src/assets/[Imagem] Logo branca.svg" alt="Logo Branca da Unect" className="logo-unect" />
                <img src="/src/assets/uTask 3.0 lgo.svg" alt="Logo da uTask 3.0" className="utask-logo" />
                <img src='/src/assets/[Botão] Light mode.svg' alt="Botão do lightmode" className="light-btn" />
            </div>
        </footer>
    )
}