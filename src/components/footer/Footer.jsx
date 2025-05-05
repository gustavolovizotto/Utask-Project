import styles from'./footer.module.css';
export function Footer ()  {
    return(
        <footer>
            <div className={styles.container}>
                <p>© Processo de Trainee </p>
                <p className='unect'>Unect Jr.</p>
                <p>Feito com ❤ por Gustavo Tesin</p>
            </div>
        </footer>
    )
}