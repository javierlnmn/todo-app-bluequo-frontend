import axios from "axios";

import { getStoredUserToken } from "@auth/utils/jwt";

import config from "@/config";
import { TodoStatus } from "../enums/todos";


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


interface UpdateTodoStatusParams {
    todoId: string;
    newStatus: keyof typeof TodoStatus;
}

export const updateTodoStatus = async ({ todoId, newStatus }: UpdateTodoStatusParams) => {
    const userJwt = getStoredUserToken();
  
    try {
      const response = await axios.patch(
        `${config.API_BASE_URL}/todos/todos/${todoId}/`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: userJwt,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error updating todo status:", error);
      throw error;
    }
  };
