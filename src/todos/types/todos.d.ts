import { TodoStatus } from "@todos/enums/todos";
import { RouteConstant } from "@common/enums/routes";
import { FC, ReactNode } from "react";

export interface Comment {
    id: string;
    todo: string;
    user: string;
    content: string;
}

export interface Todo {
    id: string;
    title: string;
    description: string;
    status: TodoStatus;
    due_date: string;
    assigned_to: string;
    comments: Comment[];
}
