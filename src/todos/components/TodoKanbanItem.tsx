import { Draggable } from '@hello-pangea/dnd';
import { FC } from 'react';

import { Todo } from '@todos/types/todos.d';


interface TodoKanbanItemProps {
    todo: Todo;
    index: number;
}

const TodoKanbanItem: FC<TodoKanbanItemProps> = ({ todo, index }) => {
    return (
        <Draggable key={todo.id} draggableId={todo.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="flex flex-col gap-1 mb-3 bg-zinc-100 dark:bg-zinc-700 p-3 rounded-lg shadow-sm cursor-grab"
                >
                    <h3 className="font-semibold text-lg">{todo.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300">{todo.description}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Assigned to: {todo.assigned_to}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Due: {todo.due_date.toDateString()}</p>
                </div>
            )}
        </Draggable>
    );
}

export default TodoKanbanItem;