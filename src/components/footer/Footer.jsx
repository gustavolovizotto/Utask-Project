import styles from'./footer.module.css';
export function Footer ()  {
    return(
        <footer>
            <div className={styles.container}>
                <p>© Processo de Trainee <a  target="_blank" href='https://unect.com.br/ '>Unect Jr.</a></p>
            
                <p>Feito com ❤ por Gustavo Tesin</p>
            </div>
        </footer>
    )
}