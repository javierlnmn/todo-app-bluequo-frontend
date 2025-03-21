import { Draggable } from '@hello-pangea/dnd';
import { FC } from 'react';

import { Todo } from '@todos/types/todos.d';

import PencilIcon from '@common/icons/PencilIcon';
import { formatDate } from '@/common/utils/dates';
import { useUserStore } from '@/auth/stores/userStore';
import CrownIcon from '@/common/icons/CrownIcon';
import { getTodoStatusKey } from '../utils/todos';


interface TodoKanbanItemProps {
    todo: Todo;
    index: number;
    handleEditTodo: (todo: Todo) => void;
}

const TodoKanbanItem: FC<TodoKanbanItemProps> = ({ todo, index, handleEditTodo }) => {

    const { username, isSuperuser } = useUserStore();

    return (
        <Draggable
            draggableId={todo.id}
            index={index}
            isDragDisabled={!isSuperuser && todo.user.username !== username}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`flex flex-col gap-1 mb-3 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg shadow-sm cursor-grab
                        ${!isSuperuser && todo.user.username !== username && `opacity-50 !cursor-default`}
                    `}
                >
                    <div className='flex gap-2 items-center justify-between mb-2'>
                        <h3 className="font-semibold text-lg">{todo.title}</h3>
                        <button onClick={() => handleEditTodo(todo)}>
                            <PencilIcon className='w-5 h-5 opacity-50 hover:opacity-100 transition-opacity cursor-pointer' />
                        </button>
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
            )}
        </Draggable>
    );
}

export default TodoKanbanItem;