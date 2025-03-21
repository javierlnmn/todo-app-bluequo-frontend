import { FC, ReactNode } from "react";

import { TodoStatus } from "@todos/enums/todos";

import { RouteConstant } from "@common/enums/routes";

import { User } from "@auth/types/user";


export interface Comment {
    id: string;
    todo: string;
    user: User;
    content: string;
    created: string;
}

export interface Todo {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
    dueDate: string;
    user: User;
    assignedTo: User;
    comments: Comment[];
    lastUpdated: string;
}
