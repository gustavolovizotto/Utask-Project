import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdviceGenerator.module.css';

const AdviceGenerator = ({ isDarkMode }) => {
  const [advice, setAdvice] = useState('');
  const [translatedAdvice, setTranslatedAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchAndTranslateAdvice = async () => {
    try {
      setLoading(true);
      setError(null);

      const adviceResponse = await axios.get(
        'https://api.adviceslip.com/advice',
      );
      const newAdvice = adviceResponse.data.slip.advice;
      setAdvice(newAdvice);

      const translateResponse = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(newAdvice)}&langpair=en|pt`,
      );

      if (translateResponse.data.responseStatus === 200) {
        setTranslatedAdvice(translateResponse.data.responseData.translatedText);
      } else {
        throw new Error('Erro na tradução');
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndTranslateAdvice();
  }, []);

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
      <div
        className={`${styles.card} ${isDarkMode ? styles.dark : ''}`}
        onClick={isMobile ? () => setShowModal(true) : undefined}
        style={isMobile ? { cursor: 'pointer' } : {}}
      >
        <img
          src={
            isDarkMode
              ? '/assets/Ícone lampada dark.svg'
              : '/assets/Ícone lampada mensagem.svg'
          }
          alt="Imagem de uma lâmpada"
          className={`${styles.image} ${isDarkMode ? styles.dark : ''}`}
        />
        <h1 className={`${styles.title} ${isDarkMode ? styles.dark : ''}`}>
          Frase do Dia
        </h1>

        {loading ? (
          <p
            className={`${styles.loading} ${isDarkMode ? styles.dark : ''}`}
          ></p>
        ) : error ? (
          <div
            className={`${styles.errorContainer} ${isDarkMode ? styles.dark : ''}`}
          >
            <p className={`${styles.error} ${isDarkMode ? styles.dark : ''}`}>
              Erro: {error}
            </p>
          </div>
        ) : (
          <p
            className={`${styles.translatedAdvice} ${isDarkMode ? styles.dark : ''}`}
          >
            "{translatedAdvice}"
          </p>
        )}
      </div>
      {isMobile && showModal && (
        <div
          className={styles.adviceModalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div
            className={styles.adviceModal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <img
                src={
                  isDarkMode
                    ? '/assets/Ícone lampada dark.svg'
                    : '/assets/Ícone lampada mensagem.svg'
                }
                alt="Fechar"
                onClick={() => setShowModal(false)}
                className={styles.logoModal}
              />
              <h2>Frase do Dia</h2>
              <img
                src={
                  isDarkMode
                    ? '/assets/[Botão] Fechar.svg'
                    : '/assets/[Botão] Fechar.svg'
                }
                alt="Fechar"
                onClick={() => setShowModal(false)}
                className={styles.closeButton}
              />
            </div>
            <p>"{translatedAdvice}"</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdviceGenerator;
