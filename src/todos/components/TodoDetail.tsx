import { Draggable } from '@hello-pangea/dnd';
import { FC } from 'react';

import { useUserStore } from '@auth/stores/userStore';
import { isOwnerOrAdmin } from '@/auth/utils/user';

import { Todo } from '@todos/types/todos.d';

import PencilIcon from '@icons/PencilIcon';
import TrashIcon from '@icons/TrashIcon';
import CrownIcon from '@icons/CrownIcon';

import { formatDate } from '@common/utils/dates';
import TodoStatusBadge from './TodoStatusBadge';


interface TodoDetailProps {
    todo: Todo;
}

const TodoDetail: FC<TodoDetailProps> = ({ todo, }) => {

    return (
        <div
            className='flex flex-col gap-4'
        >
            <div className='flex gap-2 items-center mb-2'>
                <h3 className="font-semibold text-lg">{todo.title}</h3>
                <div className='flex gap-2 items-center'>
                    <TodoStatusBadge todoStatus={todo.status} />
                </div>
            </div>
            {todo.description && <p className="text-sm text-zinc-600 dark:text-zinc-300 truncate">{todo.description}</p>}
            <div className='flex justify-between items-center'>
                {todo.assignedTo ? (
                    <span className='relative'>
                        <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">{todo.assignedTo.username}</p>
                        {todo.assignedTo.isSuperuser && (
                            <span className='absolute top-0 -right-2 rotate-[35deg]'>
                                <CrownIcon className='w-3 h-3 dark:fill-yellow-400 dark:stroke-yellow-400 fill-yellow-600 stroke-yellow-600' />
                            </span>
                        )}
                    </span>
                ) : (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Not assigned yet</p>
                )}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-right">{formatDate(todo.dueDate)}</p>
            </div>
        </div>
    );
}

export default TodoDetail;