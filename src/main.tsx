import '@/index.css';
import AppLayout from '@/AppLayout';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ErrorLayout from '@common/components/ErrorLayout';
import { sidebarRouteConstants } from '@common/routes/routes';
import Home from '@common/components/Home';

import Login from '@auth/components/Login';
import PrivateRoute from '@auth/components/PrivateRoute';
import Logout from '@auth/components/Logout';


const router = createBrowserRouter([
	{
		path: '',
		element: (
			<PrivateRoute>
				<AppLayout />
			</PrivateRoute>
		),
		errorElement: (
			<ErrorLayout />
		),
		children: [
			{ path: sidebarRouteConstants.HOME, element: <Home /> },
			{ path: sidebarRouteConstants.TODOS, element: <p>Todoes</p> },
		],
	},
	{
		path: 'login',
		element: <Login />
	},
	{
		path: 'logout',
		element: <Logout />
	},
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>
)
