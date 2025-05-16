import styles from './footer.module.css';
import { useEffect, useState } from 'react';

function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
}

export function Footer({ isDarkMode }) {
  const isMobile = useIsMobile();

  return (
    <footer>
      <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
        {isMobile ? (
          // Estrutura mobile
          <div className={styles.mobileFooter}>
            <p>
              © Processo de Trainee{' '}
              <a target="_blank" href="https://unect.com.br/ ">
                Unect Jr.
              </a>{' '}
              <br />
              Feito com ❤ por{' '}
              <a target="_blank" href="https://github.com/gustavolovizotto">
                Gustavo Tesin
              </a>
            </p>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </footer>
  );
}
