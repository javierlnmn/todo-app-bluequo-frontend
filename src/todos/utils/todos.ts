import { emptyUserData } from "@auth/utils/user";

import { TodoStatus } from "@todos/enums/todos.d";
import { Todo } from "@todos/types/todos.d";
import { TodoFormData } from "@todos/components/TodoForm";


export const emptyTodoData: Todo = {
    id: '',
    title: '',
    description: '',
    status: TodoStatus.PENDING,
    dueDate: '',
    assignedTo: emptyUserData,
    user: emptyUserData,
    comments: [ { content: '', created: '', id: '', todo: '', user: emptyUserData, } ],
    lastUpdated: '',
}

export const getTodoStatusKey = (status: TodoStatus) => Object.keys(TodoStatus).find(key => (
    TodoStatus[key as keyof typeof TodoStatus] === status
));

export const emptyTodoFormData: TodoFormData = {
    id: '',
    title: '',
    description: '',
    status: getTodoStatusKey(TodoStatus.PENDING) || 'PENDING',
    dueDate: '',
    assignedTo: '',
}