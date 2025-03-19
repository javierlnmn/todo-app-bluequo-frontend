import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


interface SidebarOptionProps {
    isSidebarOpen: boolean;
    currentLocation: string;
    Icon: React.ElementType | null;
    title: string;
    pathname: string;
}

const Option: React.FC<SidebarOptionProps> = ({ isSidebarOpen, currentLocation, Icon, title, pathname }) => {
    return (
        <Link to={pathname}>
            <motion.button
                layout
                className={`cursor-pointer h-10 flex gap-2 w-full items-center transition-colors hover:bg-zinc-700 ${pathname == currentLocation && "bg-zinc-600/70 hover:!bg-zinc-600/70" }`}
                style={{ borderRadius: '5px' }}
            >
                <motion.div
                    layout
                    className='grid h-full w-10 place-content-center'
                >
                    {Icon && 
                        <Icon className='h-6 w-6' />
                    }
                </motion.div>
                {isSidebarOpen && (
                    <motion.p
                        className={'text-md'}
                        layout
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.15 }}
                    >
                        {title}
                    </motion.p>
                )}
            </motion.button>
        </Link>
	)
}

export default Option;
