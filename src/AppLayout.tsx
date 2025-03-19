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
				setUser(userStoreData);
			}
		};

		setUserStoreData();
	}, [setUser]);

	return (
		<main className='bg-zinc-100 text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200 min-h-screen overflow-x-hidden max-md:pl-[65px]'>
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
