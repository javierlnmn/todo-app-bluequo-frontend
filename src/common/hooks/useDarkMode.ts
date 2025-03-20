import { useState, useEffect } from 'react';

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(false);

    const updateDocumentDarkMode = (darkMode: boolean) => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }

    useEffect(() => {
        const storedDarkMode = localStorage.getItem('darkMode');
        let darkMode = false;
        if (storedDarkMode) {
            darkMode = storedDarkMode === 'true';
        } else {
            darkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        }
        setDarkMode(darkMode);
        updateDocumentDarkMode(darkMode);
    }, []);

    const toggleDarkMode = () => {
        setDarkMode((prevMode: boolean) => {
            const newMode = !prevMode;
            localStorage.setItem('darkMode', newMode.toString());
            updateDocumentDarkMode(newMode);
            return newMode;
        });
    };

    return { darkMode, toggleDarkMode };
};

export default useDarkMode;
