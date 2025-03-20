import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";

import LoadingThrobber from "@/common/components/LoadingThrobber";
import PlusIcon from "@common/icons/PlusIcon";

import { Todo, } from "@todos/types/todos.d";
import { TodoStatus, } from "@todos/enums/todos.d";
import TodoStatusBadge from "@todos/components/TodoStatusBadge";
import TodoKanbanItem from "@todos/components/TodoKanbanItem";
import { getTodos } from "@todos/services/todos";


const TodoKanban = () => {

	// Todos fetchign
	const { data: fetchedTodos = [], isPending, } = useQuery<Todo[]>({
		queryKey: ["todos"],
		queryFn: getTodos,
		retry: false,
		refetchOnWindowFocus: false,
	});

	// Todos state managing
	const [todos, setTodos] = useState<Todo[]>(fetchedTodos);
	useEffect(() => {
		if (!isPending && fetchedTodos) {
			setTodos(fetchedTodos);
		}
	}, [fetchedTodos]);

	// Drag and drop
	const onDragEnd = (result: any) => {
		const { destination, draggableId } = result;
		if (!destination) return;
	
		const updatedTodos = [...todos];
		const draggedTodoIndex = updatedTodos.findIndex(todo => todo.id === draggableId);
		
		if (draggedTodoIndex === -1) return;
	
		const [draggedTodo] = updatedTodos.splice(draggedTodoIndex, 1);
		draggedTodo.status = destination.droppableId as TodoStatus;
	
		const destinationTodos = updatedTodos.filter(todo => todo.status === draggedTodo.status);

		destinationTodos.splice(destination.index, 0, draggedTodo);
	
		const statusOrder = [TodoStatus.PENDING, TodoStatus.IN_PROGRESS, TodoStatus.COMPLETED];
		const sortedTodos: Todo[] = [];
	
		statusOrder.forEach(status => {
			if (status === draggedTodo.status) {
				sortedTodos.push(...destinationTodos);
			} else {
				sortedTodos.push(...updatedTodos.filter(todo => todo.status === status));
			}
		});
	
		setTodos(sortedTodos);
	};
	
	
	if (isPending) return <LoadingThrobber className="h-full w-full" />;

	return (
		<div className="w-full bg-zinc-100 dark:bg-zinc-900 p-6">
			<h1 className="font-bold text-4xl mb-6">Todos</h1>

			<div className="grid gap-6 grid-cols-3 max-xl:grid-cols-2 max-lg:grid-cols-1 ">
				<DragDropContext onDragEnd={onDragEnd}>
					{Object.values(TodoStatus).map((status) => (
						<div
							key={status}
							className={`p-4 rounded-lg min-h-[200px] flex flex-col gap-3
								${status === TodoStatus.COMPLETED ? "bg-emerald-500/10 dark:bg-emerald-700/10" : ""}
								${status === TodoStatus.IN_PROGRESS ? "bg-sky-500/10 dark:bg-sky-700/10" : ""}
								${status === TodoStatus.PENDING ? "bg-purple-500/10 dark:bg-purple-700/10 lg:col-span-2 xl:col-span-1" : ""}
							`}
						>
							<div className="flex items-center justify-between">
								<TodoStatusBadge todoStatus={status} />
								<PlusIcon className="w-8 h-8 opacity-50 hover:opacity-100 transition-opacity cursor-pointer" />
							</div>

							<Droppable droppableId={status}>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.droppableProps}
										className="flex flex-col min-h-[150px]"
									>
										{todos.filter((todo) => todo.status.toLowerCase() === status.toLocaleLowerCase()).map((todo, index) => (
											<TodoKanbanItem key={todo.id} index={index} todo={todo} />
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
