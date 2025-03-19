import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

import { Todo, } from "@todos/types/todos.d"; 
import { TodoStatus, } from "@todos/enums/todos.d"; 
import TodoStatusBadge from "./TodoStatusBadge";
import TodoKanbanItem from "./TodoKanbanItem";


const mockTodos: Todo[] = [
    { id: "1", title: "Task 1", description: "Do something", status: TodoStatus.PENDING, assigned_to: "User A", due_date: new Date(), comments: [] },
    { id: "2", title: "Task 2", description: "Work on this", status: TodoStatus.IN_PROGRESS, assigned_to: "User B", due_date: new Date(), comments: [] },
    { id: "3", title: "Task 3", description: "Finish this", status: TodoStatus.COMPLETED, assigned_to: "User C", due_date: new Date(), comments: [] },
];

const TodoKanban = () => {
    const [todos, setTodos] = useState<Todo[]>(mockTodos);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const updatedTodos = [...todos];
        const draggedTodo = updatedTodos.find(todo => todo.id === result.draggableId);
        
        if (draggedTodo) {
            draggedTodo.status = result.destination.droppableId as TodoStatus;
            setTodos(updatedTodos);
        }
    };

    return (
		<div className="w-full bg-zinc-100 dark:bg-zinc-900 p-6">
			<h1 className="font-bold text-4xl mb-6">Todos</h1>

			<div className="grid gap-6 grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 ">
				<DragDropContext onDragEnd={onDragEnd}>
					{Object.values(TodoStatus).map((status) => (
						<div
							key={status}
							className={`p-4 rounded-lg shadow-md min-h-[200px] flex flex-col gap-3
								${status === TodoStatus.COMPLETED ? "bg-emerald-500/10 dark:bg-emerald-700/10" : ""}
								${status === TodoStatus.IN_PROGRESS ? "bg-sky-500/10 dark:bg-sky-700/10" : ""}
								${status === TodoStatus.PENDING ? "bg-purple-500/10 dark:bg-purple-700/10 lg:col-span-2 xl:col-span-1" : ""}
							`}
						>
							<div className="flex justify-end">
								<TodoStatusBadge todoStatus={status} />
							</div>

							<Droppable droppableId={status}>
								{(provided) => (
									<div 
										ref={provided.innerRef} 
										{...provided.droppableProps} 
										className="flex flex-col min-h-[150px]"
									>
										{todos.filter((todo) => todo.status === status).map((todo, index) => (
											<TodoKanbanItem index={index} todo={todo} />
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					))}
        		</DragDropContext>
			</div>
		</div>
    );
};

export default TodoKanban;
