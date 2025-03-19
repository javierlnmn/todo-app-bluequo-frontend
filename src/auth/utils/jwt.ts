export const setStoredUserToken = (userJwt: string) => {
	try {

		localStorage.setItem('userJwt', userJwt);

	} catch (error) {
		console.error(error);
	}
}

export const getStoredUserToken = (): string => {
	try {
		const userJwt = localStorage.getItem('userJwt');

		return userJwt || '';

	} catch (error) {
		console.error(error);
	}

	return '';
}

export const removeStoredUserToken = () => {
	try {

		localStorage.removeItem('userJwt');

	} catch (error) {
		console.error(error);
	}
}

// export const setStoredUserRefresh = (userJwt: string) => {
// 	try {

// 		localStorage.setItem('userRefresh', userJwt);

// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// export const getStoredUserRefresh = (): string => {
// 	try {
// 		const userJwt = localStorage.getItem('userRefresh');

// 		return userJwt || '';

// 	} catch (error) {
// 		console.error(error);
// 	}

// 	return '';
// }

// export const removeStoredUserRefresh = () => {
// 	try {

// 		localStorage.removeItem('userRefresh');

// 	} catch (error) {
// 		console.error(error);
// 	}
// }
