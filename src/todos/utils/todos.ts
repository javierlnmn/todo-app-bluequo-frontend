import { TodoStatus } from "@todos/enums/todos.d";

export const getTodoStatusKey = (status: TodoStatus) => Object.keys(TodoStatus).find(key => (
    TodoStatus[key as keyof typeof TodoStatus] === status
));