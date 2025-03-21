import axios from "axios";

import config from "@/config";

import { getStoredUserToken } from "@auth/utils/jwt";

import { Comment } from "@todos/types/todos";
import { CommentFormData } from "@todos/components/TodoComments";


const { API_BASE_URL } = config;

export const deleteComment = async (commentId: Comment['id']) => {
	const userJwt = getStoredUserToken();

	try {

		await axios.delete(`${API_BASE_URL}/todos/comments/${commentId}/`,
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

export const postComment = async (comment: CommentFormData) => {
	const userJwt = getStoredUserToken();

	try {

		const response = await axios.post(`${API_BASE_URL}/todos/comments/`, comment,
			{
				headers: {
					Authorization: userJwt,
				},
			}
		);

		return response.data;

	} catch (error) {
		console.error("Error deleting comment:", error);
		throw error;
	}
};
