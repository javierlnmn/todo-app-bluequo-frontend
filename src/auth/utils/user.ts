import { getStoredUserToken } from "@auth/utils/jwt";
import { getUserData } from "@auth/services/user";


export const isUserAuthenticated = async () => {
	const userJwt = getStoredUserToken();

	if (!userJwt) {
		return false;
	}

	try {
		const tokenValidationResponse = await getUserData(userJwt);

		if (tokenValidationResponse.status === 200) {
			return true;
		}
	
		return false;
	} catch {
		return false;
	}
}

export const getUserStoreData = async () => {
	
	const userJwt = getStoredUserToken();
	
	if (!userJwt) {
		return null;
	}

	try {
		const userDataResponse = await getUserData(userJwt);

		if (userDataResponse.status === 200) {
			const userData = userDataResponse.data;
			return {
				username: userData.username,
				isSuperuser: userData.isSuperuser
			};
		}
	} catch (error) {
		throw error;
	}

	return null;
};