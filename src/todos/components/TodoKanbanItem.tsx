import { Draggable } from '@hello-pangea/dnd';
import { FC } from 'react';
import { motion } from 'framer-motion';

import { useUserStore } from '@auth/stores/userStore';
import { isOwnerOrAdmin } from '@/auth/utils/user';

import { Todo } from '@todos/types/todos.d';

import PencilIcon from '@icons/PencilIcon';
import TrashIcon from '@icons/TrashIcon';
import CrownIcon from '@icons/CrownIcon';

import { formatDate } from '@common/utils/dates';


interface TodoKanbanItemProps {
    todo: Todo;
    index: number;
    handleEditTodo: (todo: Todo) => void;
    handleDeleteTodo: (todoId: Todo['id']) => void;
}

const TodoKanbanItem: FC<TodoKanbanItemProps> = ({ todo, index, handleEditTodo, handleDeleteTodo }) => {

    const { username, isSuperuser } = useUserStore();

    return (
        <Draggable
            draggableId={todo.id}
            index={index}
            isDragDisabled={!isOwnerOrAdmin(isSuperuser, username, todo.user.username)}
        >
            {(provided) => (
                <motion.div
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: .9 }}
                    transition={{ duration: 0.2 }}
                >
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`flex flex-col gap-1 mb-3 bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg shadow-sm cursor-grab
                            ${!isOwnerOrAdmin(isSuperuser, username, todo.user.username) && `opacity-50 !cursor-default`}
                        `}
                        
                    >
                        <div className='flex gap-2 items-center justify-between mb-2'>
                            <h3 className="font-semibold text-lg">{todo.title}</h3>
                            <div className='flex gap-2 items-center'>
                                <button onClick={isOwnerOrAdmin(isSuperuser, username, todo.user.username) ? () => handleEditTodo(todo) : undefined}>
                                    <PencilIcon className={`w-5 h-5 opacity-50 ${isOwnerOrAdmin(isSuperuser, username, todo.user.username) && 'hover:opacity-100 cursor-pointer' } transition-opacity`} />
                                </button>
                                <button onClick={isOwnerOrAdmin(isSuperuser, username, todo.user.username) ? () => handleDeleteTodo(todo.id) : undefined}>
                                    <TrashIcon className={`w-5 h-5 opacity-50 ${isOwnerOrAdmin(isSuperuser, username, todo.user.username) && 'hover:opacity-100 hover:text-red-500 cursor-pointer' } transition-all`} />
                                </button>
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
                </motion.div>
            )}
        </Draggable>
    );
}

export default TodoKanbanItem;