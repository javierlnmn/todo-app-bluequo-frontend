import { AnimatePresence, motion } from 'framer-motion';

import useDarkMode from '@common/hooks/useDarkMode';

import MoonIcon from '@icons/MoonIcon';
import SunIcon from '@icons/SunIcon';


const ToggleDarkModeButtons = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div
            style={{ borderRadius: '5px' }}
            className='hover:bg-zinc-300 dark:hover:bg-zinc-700 transition-colors w-fit'
        >
            <AnimatePresence mode="wait">
                <motion.button
                    key={darkMode ? "sun" : "moon"}  // Ensure the key changes between sun and moon
                    layout
                    className="cursor-pointer grid h-10 w-10 place-content-center"
                    style={{ borderRadius: '5px' }}
                    onClick={toggleDarkMode}
                    initial={{ opacity: 0, x: 12, rotate: 45 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: -12, rotate: -45 }}
                    transition={{ duration: 0.2 }}
                >
                    {darkMode ? <SunIcon className="w-6 h-6" /> : <MoonIcon className="w-6 h-6" />}
                </motion.button>
            </AnimatePresence>
        </div>
    );
};

export default ToggleDarkModeButtons;
