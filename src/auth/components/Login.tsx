import { FC, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import LoadingThrobberIcon from '@icons/LoadingThrobberIcon';

import LoadingThrobber from '@common/components/LoadingThrobber';
import ToggleDarkModeButtons from '@common/components/ToggleDarkModeButtons';

import { LoginFormProps } from '@auth/types/user';
import { userLogin } from '@auth/services/user';
import { setStoredUserToken } from '@auth/utils/jwt';
import { isUserAuthenticated } from '@auth/utils/user';


const Login: FC = () => {
	const navigate = useNavigate();

	// Check if user is authenticated already
    const [userAuthenticated, setUserAuthenticated] = useState<boolean | null>(null);

	useEffect(() => {

        const checkUserIsAuthenticated = async () => {
            try {
				const userAuthenticated = await isUserAuthenticated();

                if (userAuthenticated) navigate('/');

				setUserAuthenticated(userAuthenticated);
			} catch (error) {
				setUserAuthenticated(false);
			}
        };

        checkUserIsAuthenticated();

    }, []);

	// Handle form
	const [formData, setFormData] = useState<LoginFormProps>({ username: '', password: '' });
	const [submitButtonLoading, setSubmitButtonLoading] = useState(false);
	const [formError, setFormError] = useState('');

	const handleFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async () => {
		setSubmitButtonLoading(true);
		setFormError('');

		try {
			const userLoginResponse = await userLogin(formData);

			if (userLoginResponse.status === 200) {
				const userLoginData = userLoginResponse.data;
				const token = `Bearer ${userLoginData.access}`;
				setStoredUserToken(token);
				setUserAuthenticated(true);
			} else {
				setFormError('Incorrect username or password');
			}
		} catch (error) {
			setFormError('An error occurred during login');
		} finally {
			setSubmitButtonLoading(false);
		}
	};

	return userAuthenticated === null ? (
		<LoadingThrobber className='h-screen w-full bg-zinc-50 text-zinc-800 dark:text-zinc-200 dark:bg-zinc-800' />
	) : userAuthenticated ? (
		<Navigate to={'/'} />
	) : (
		<div className='h-screen w-screen grid place-items-center bg-zinc-50 text-zinc-900 dark:text-zinc-200 dark:bg-zinc-900'>
			<div className='absolute top-3 right-3'>
				<ToggleDarkModeButtons />
			</div>
			<div className='bg-zinc-100 dark:bg-zinc-800 w-11/12 h-auto max-w-[500px] p-5 rounded-md shadow-md flex flex-col gap-3'>
				<h2 className='text-lg font-bold'>Login</h2>
				<div className='flex flex-col gap-5 items-center justify-center'>
					<input
						onChange={handleFieldChange}
						name='username'
						value={formData.username}
						type='text'
						placeholder='Username or Email'
						className='w-full p-3  bg-zinc-200 dark:bg-zinc-700 rounded-md border-0 shadow-md outline-none transition-all hover:bg-zinc-300/70 focus:bg-zinc-300/70 dark:hover:bg-zinc-500/80 dark:focus:bg-zinc-500/80'
					/>
					<input
						onChange={handleFieldChange}
						name='password'
						value={formData.password}
						type='password'
						placeholder='Password'
						className='w-full p-3  bg-zinc-200 dark:bg-zinc-700 rounded-md border-0 shadow-md outline-none transition-all hover:bg-zinc-300/70 focus:bg-zinc-300/70 dark:hover:bg-zinc-500/80 dark:focus:bg-zinc-500/80'
					/>
					<button
						disabled={!formData.password || !formData.username}
						onClick={handleSubmit}
						type='submit'
						className='text-zinc-100 bg-sky-600 transition-colors disabled:opacity-50 disabled:hover:bg-sky-600 hover:bg-sky-500 cursor-pointer w-full p-3 rounded-md font-bold flex justify-center'
					>
						{submitButtonLoading ? (
							<LoadingThrobberIcon className='w-5 h-5 !fill-zinc-100 !text-zinc-200/60 dark:!text-zinc-300/50' />
						) : (
							'Submit'
						)}
					</button>
				</div>
				{formError ? <p className='text-red-500'>{formError}</p> : ''}
			</div>
		</div>
	);
};

export default Login;
