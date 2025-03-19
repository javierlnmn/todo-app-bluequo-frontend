import { motion } from 'framer-motion';

import ChevronIcon from '@icons/ChevronIcon';


interface TitleSectionProps {
    isSidebarOpen: boolean;
    handleToggleSidebar: () => void;
    username: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ isSidebarOpen, handleToggleSidebar, username }) => {
    return (
        <div className='h-11 flex items-center justify-between rounded-md transition-colors'>
            <div className='w-full flex justify-center items-center gap-2'>
                <motion.div
                    layout
                    className='h-full w-10 size-8 shrink-0 flex items-center justify-center'
                    onClick={handleToggleSidebar}
                >
                    <ChevronIcon className={`size-8 transition-transform duration-500 -rotate-90 ${isSidebarOpen && '!rotate-90'}`} />
                </motion.div>
                {isSidebarOpen && (
                    <motion.div
                        className="w-full max-w-36 flex flex-col items-end"
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        <span className='text-sm max-w-36 font-light block truncate'>Welcome,</span>
                        <span className='text-sm max-w-36 font-bold block truncate'>{username}</span>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default TitleSection;
