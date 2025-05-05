import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './AdviceGenerator.module.css';


const AdviceGenerator = () => {
  const [advice, setAdvice] = useState('');
  const [translatedAdvice, setTranslatedAdvice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const fetchAndTranslateAdvice = async () => {
    try {
      setLoading(true);
      setError(null);
      

      const adviceResponse = await axios.get('https://api.adviceslip.com/advice');
      const newAdvice = adviceResponse.data.slip.advice;
      setAdvice(newAdvice);

      const translateResponse = await axios.get(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(newAdvice)}&langpair=en|pt`
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
    <div className={styles.container}>
      <div className={styles.card}>
        <img src='/assets/Ícone lampada mensagem.svg' alt='Imagem de uma lâmpada' className={styles.image} />
        <h1 className={styles.title}>Frase do Dia</h1>
        
        {loading ? (
          <p className={styles.loading}>Carregando sabedoria...</p>
        ) : error ? (
          <div className={styles.errorContainer}>
            <p className={styles.error}>Erro: {error}</p>
          </div>
        ) : (
          <p className={styles.translatedAdvice}>"{translatedAdvice}"</p>
        )}
      </div>
      </div>
  );
};

export default AdviceGenerator;