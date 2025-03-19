import { FC } from 'react';
import { motion } from 'framer-motion';

import LoadingThrobberIcon from '@icons/LoadingThrobberIcon';


interface LoadingThrobberProps {
    className?: string;
}

const LoadingThrobber: FC<LoadingThrobberProps> = ({ className, }) => {

    return (
        <motion.div className={`${className} grid place-items-center`}>
            <LoadingThrobberIcon className='w-8 h-8' />
            <span className="sr-only">Loading...</span>
        </motion.div>
    );
}

export default LoadingThrobber;