import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Sidebar from '@common/components/Sidebar/Sidebar';
import { useUserStore } from '@auth/stores/userStore';
import { getUserStoreData } from '@auth/utils/user';


const AppLayout = () => {

	const { setUser } = useUserStore();

	useEffect(() => {
		const setUserStoreData = async () => {
			const userStoreData = await getUserStoreData();
			
			if (userStoreData) {
				setUser(userStoreData)
			}
		}

		setUserStoreData();
	}, []);

	return (
		<main className='bg-zinc-900 text-gray-100 h-screen'>
			<div className='flex'>
				<Sidebar />
				<div className="flex-1 p-4">
					<Outlet />
				</div>
			</div>
		</main>
	);
};

export default AppLayout;
