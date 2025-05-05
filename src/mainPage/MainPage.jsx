import AdviceGenerator from "../components/advice/AdviceGenerator";
import { Footer } from "../components/footer/Footer";
import { Header} from "../components/header/Header";
import styles from './mainPage.module.css';
import KanbanBoard from "../components/kanban/kanbanBoard";
import { useState } from 'react';

export function MainPage () {
    const [isDarkMode, setIsDarkMode] = useState(false);
      
      
        const toggleDarkMode = () => {
          setIsDarkMode(!isDarkMode);
        };

    return (
        <div className={`${styles.container} ${isDarkMode ? styles.dark : ''}`}>
                <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
            <div className="content">
                <AdviceGenerator isDarkMode={isDarkMode}/>
                <KanbanBoard isDarkMode={isDarkMode}/>
                <Footer isDarkMode={isDarkMode}/>
                
            </div>
        </div>
    );
}