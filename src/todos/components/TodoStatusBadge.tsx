import { FC } from 'react';

import { TodoStatus } from '@todos/enums/todos.d';


interface TodoStatusBadgeProps {
    todoStatus: TodoStatus
}

const TodoStatusBadge: FC<TodoStatusBadgeProps> = ({ todoStatus }) => {
    return (
        <h2
            className={`w-fit uppercase font-bold text-sm px-2 py-1 rounded-lg text-zinc-100 text-center
                ${todoStatus === TodoStatus.COMPLETED && "bg-emerald-800/80 dark:bg-emerald-500/60"}
                ${todoStatus === TodoStatus.IN_PROGRESS && "bg-sky-800/80 dark:bg-sky-500/60"}
                ${todoStatus === TodoStatus.PENDING && "bg-purple-800/80 dark:bg-purple-500/60"}
            `}
        >
            {todoStatus}
        </h2>
    );
}

export default TodoStatusBadge;