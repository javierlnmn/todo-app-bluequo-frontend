import { motion } from 'framer-motion';

import CrownIcon from '@icons/CrownIcon';
import ChevronIcon from '@icons/ChevronIcon';


interface TitleSectionProps {
    isSidebarOpen: boolean;
    handleToggleSidebar: () => void;
    username: string;
    isSuperuser: boolean;
}

const TitleSection: React.FC<TitleSectionProps> = ({ isSidebarOpen, handleToggleSidebar, username, isSuperuser }) => {
    return (
        <div className='h-11 flex items-center justify-between rounded-md transition-colors'>
            <div className='w-full flex justify-center items-center gap-2'>
                <motion.div
                    layout
                    className='h-full w-10 size-8 shrink-0 flex items-center justify-center'
                    onClick={handleToggleSidebar}
                >
                    <ChevronIcon className={`size-8 transition duration-500 -rotate-90 ${isSidebarOpen && '!rotate-90'} opacity-50 hover:opacity-100 cursor-pointer`} />
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
                        <div className='relative'>
                            <span className='text-sm max-w-36 font-bold block truncate'>{username}</span>
                            {isSuperuser && (
                                <div className='absolute top-0 -right-2 rotate-[35deg]'>
                                    <CrownIcon className='w-3 h-3 dark:fill-yellow-400 dark:stroke-yellow-400 fill-yellow-600 stroke-yellow-600' />
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default TitleSection;
