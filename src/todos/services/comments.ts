import axios from "axios";

import config from "@/config";

import { getStoredUserToken } from "@auth/utils/jwt";


const { API_BASE_URL } = config;

export const deleteComment = async (commentId: string) => {
	const userJwt = getStoredUserToken();

	try {

		await axios.delete(
			`${API_BASE_URL}/todos/comments/${commentId}/`,
			{
				headers: {
					Authorization: userJwt,
				},
			}
		);

		return commentId;

	} catch (error) {
		console.error("Error deleting comment:", error);
		throw error;
	}
};
