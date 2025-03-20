import { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


interface BaseModalWindowProps {
    children: ReactNode;
    displayed: boolean;
    containerStyle?: string;
    contentStyle?: string;
}

interface CloseableModalWindowProps extends BaseModalWindowProps {
    closeable: true;
    onClose: () => void;
}

interface NonCloseableModalWindowProps extends BaseModalWindowProps {
    closeable: false;
    onClose?: never;
}

type ModalWindowProps = CloseableModalWindowProps | NonCloseableModalWindowProps;

const ModalWindow: FC<ModalWindowProps> = ({ children, displayed, closeable = false, onClose, containerStyle, contentStyle}) => {

    return (
        <AnimatePresence>
            {displayed &&
                <motion.div
                    className={`fixed z-50 top-0 left-0 h-screen w-screen backdrop-blur-sm backdrop-brightness-50 grid place-items-center ${containerStyle}`}
                    onClick={() => { closeable && onClose?.()}}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`p-5 bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 rounded-md shadow-md w-11/12 flex flex-col ${contentStyle}`}
                        initial={{ opacity: 0, y: "20vh" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-20vh" }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            }
        </AnimatePresence>
    );
}

export default ModalWindow;