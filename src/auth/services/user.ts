import axios from "axios";

import { LoginFormProps } from "@auth/types/user";

import config from "@/config";
import { getStoredUserToken } from "../utils/jwt";


const { API_BASE_URL } = config;

export const userLogin = async (formData: LoginFormProps) => {

    try {

        const response = await axios.post(`${API_BASE_URL}/users/login/`, formData, { validateStatus: undefined });
        
        return response;

    } catch (error) {
        throw error;
    }
    
}

export const getUserData = async (token: string) => {

    try {

        const response = await axios.get(`${API_BASE_URL}/users/token/test/`, { headers: { 'Authorization': token } });

        return response;   

    } catch (error) {
        throw error;
    }
    
}

export const getUsersList = async () => {

    const userJwt = getStoredUserToken();

    try {

        const response = await axios.get(`${API_BASE_URL}/users/users/`, { headers: { 'Authorization': userJwt } });

        return response.data;   

    } catch (error) {
        throw error;
    }

}
