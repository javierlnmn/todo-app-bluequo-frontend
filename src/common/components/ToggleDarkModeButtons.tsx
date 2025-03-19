import { AnimatePresence, motion } from 'framer-motion';

import useDarkMode from '@common/hooks/useDarkMode';
import MoonIcon from '@common/icons/MoonIcon';
import SunIcon from '@common/icons/SunIcon';

const ToggleDarkModeButtons = () => {
    const { darkMode, toggleDarkMode } = useDarkMode();

    return (
        <div>
            <AnimatePresence mode="wait">
                {darkMode ? (
                    <motion.button
                        key="sun"
                        layout
                        className="cursor-pointer grid h-10 w-10 place-content-center"
                        style={{ borderRadius: '5px' }}
                        onClick={toggleDarkMode}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -12 }}
                        transition={{ duration: 0.2 }}
                    >
                        <SunIcon className="w-6 h-6" />
                    </motion.button>
                ) : (
                    <motion.button
                        key="moon"
                        layout
                        className="cursor-pointer grid h-10 w-10 place-content-center"
                        style={{ borderRadius: '5px' }}
                        onClick={toggleDarkMode}
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 12 }}
                        transition={{ duration: 0.2 }}
                    >
                        <MoonIcon className="w-6 h-6" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ToggleDarkModeButtons;
