import axios from "axios";

import { getStoredUserToken } from "@auth/utils/jwt";

import config from "@/config";


const { API_BASE_URL } = config;

export const getTodos = async () => {

    const userJwt = getStoredUserToken();

    try {

        const response = await axios.get(`${API_BASE_URL}/todos/todos/`, {
            headers: {
                Authorization: userJwt,
            },
            validateStatus: undefined
        });

        return response.data;

    } catch (error) {
        throw error;
    }
    
}
