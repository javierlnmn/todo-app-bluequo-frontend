import { FC } from 'react';

import { TodoStatus } from '@todos/enums/todos.d';


interface TodoStatusBadgeProps {
    todoStatus: TodoStatus
}

const TodoStatusBadge: FC<TodoStatusBadgeProps> = ({ todoStatus }) => {
    return (
        <h2
            className={`w-fit uppercase font-black text-sm px-2 py-1 rounded-full text-zinc-100 text-center
                ${todoStatus === TodoStatus.COMPLETED && "border dark:border-emerald-400 border-emerald-500 bg-emerald-800/60 dark:bg-emerald-500/30"}
                ${todoStatus === TodoStatus.IN_PROGRESS && "border dark:border-sky-400 border-sky-500 bg-sky-800/60 dark:bg-sky-500/30"}
                ${todoStatus === TodoStatus.PENDING && "border dark:border-purple-400 border-purple-500 bg-purple-800/60 dark:bg-purple-500/30"}
            `}
        >
            {todoStatus}
        </h2>
    );
}

export default TodoStatusBadge;