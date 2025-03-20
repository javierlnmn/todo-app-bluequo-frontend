import { FC, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { TodoStatus } from "@todos/enums/todos.d";
import { createTodo, updateTodo } from "@todos/services/todos";
import { getTodoStatusKey } from "../utils/todos";


export interface TodoFormData {
	id: string;
	title: string;
	description: string;
	status: string;
	dueDate: string;
	assignedTo: string | null;
}

interface TodoFormProps {
	todo: TodoFormData;
	onClose: () => void;
}

const TodoForm: FC<TodoFormProps> = ({ todo, onClose }) => {
	const queryClient = useQueryClient();

	// Form
	const [formData, setFormData] = useState<TodoFormData>({
		...todo,
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	}

	// Mutation for creating/updating todo
	const mutation = useMutation({
		mutationFn: async (data: TodoFormData) => {
			if (!todo.id) {
				return createTodo(data);
			} else {
				return updateTodo(data);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["todos"] });
			onClose();
		},
		onError: (error) => {
			toast.error('Oops! An error occured while creating or updating a todo!', {
				className: '!bg-zinc-100 dark:!bg-zinc-800 !text-zinc-800 dark:!text-zinc-200',
			});
			throw error;
		},
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		mutation.mutate(formData);
	}

	return (
		<div className="flex flex-col gap-2">
			<h2 className="text-xl font-bold mb-4">{todo.id ? "Edit Todo" : "Create Todo"}</h2>

			<form onSubmit={handleSubmit} className="flex flex-col gap-4">
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					placeholder="Todo Title"
					className="p-2 border rounded-md"
					required
				/>

				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					placeholder="Todo Description"
					className="p-2 border rounded-md"
				/>

				<select name="status" value={formData.status} onChange={handleChange} className="p-2 border rounded-md">
					{Object.values(TodoStatus).map((status) => (
						<option key={status} value={getTodoStatusKey(status as TodoStatus)}>
							{status}
						</option>
					))}
				</select>

				<input
					type="date"
					name="dueDate"
					value={formData.dueDate}
					onChange={handleChange}
					className="p-2 border rounded-md"
				/>

				<div className="flex gap-2">
					<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
						{todo.id ? "Update" : "Create"}
					</button>
					<button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400">
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default TodoForm;
