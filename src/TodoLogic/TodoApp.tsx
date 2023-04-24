import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';

type Todo = {
	id: string;
	text: string;
};

const TodoApp = () => {
	// state variables to hold todos and completed todos
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	// useEffect hook to load saved todos from localStorage on mount
	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		const storedCompletedTodos = JSON.parse(
			localStorage.getItem('completedTodos') || '[]'
		);
		setTodos(storedTodos);
		setCompletedTodos(storedCompletedTodos);

		const currentDate = new Date().toLocaleDateString();
		const storedDate = localStorage.getItem('date');

		// clear todos if date has changed
		if (currentDate !== storedDate) {
			localStorage.removeItem('todos');
			localStorage.removeItem('completedTodos');
			setTodos([]);
			setCompletedTodos([]);
		}
		localStorage.setItem('date', currentDate);
	}, []);

	// handle function to add a new todo item
	const handleAddTodo = (todo: Todo) => {
		const updatedTodos = [...todos, todo];
		setTodos(updatedTodos);
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
	};

	// handle function to remove a todo item
	const handleRemoveTodo = (id: string) => {
		// filter out the todo item from both lists
		const updatedTodos = todos.filter((t) => t.id !== id);
		const updatedCompletedTodos = completedTodos.filter((t) => t.id !== id);
		setTodos(updatedTodos);
		setCompletedTodos(updatedCompletedTodos);
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
		localStorage.setItem(
			'completedTodos',
			JSON.stringify(updatedCompletedTodos)
		);
	};

	// handle function to toggle a todo item between the two lists
	const handleToggleTodo = (todo: Todo) => {
		const updatedTodos = [...todos];
		const updatedCompletedTodos = [...completedTodos];

		// find the index of the todo item in each list
		const todoIndex = updatedTodos.findIndex((t) => t.id === todo.id);
		const completedTodoIndex = updatedCompletedTodos.findIndex(
			(t) => t.id === todo.id
		);

		if (todoIndex !== -1 && completedTodoIndex === -1) {
			// remove the todo item from the todos list and add it to the completed todos list
			updatedTodos.splice(todoIndex, 1);
			updatedCompletedTodos.push(todo);
		} else if (todoIndex === -1 && completedTodoIndex !== -1) {
			// remove the todo item from the completed todos list and add it to the todos list
			updatedCompletedTodos.splice(completedTodoIndex, 1);
			updatedTodos.push(todo);
		}

		setTodos(updatedTodos);
		setCompletedTodos(updatedCompletedTodos);
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
		localStorage.setItem(
			'completedTodos',
			JSON.stringify(updatedCompletedTodos)
		);
	};

	// render the UI
	return (
		<div>
			<h1 className="container mt-3">Todo List</h1>
			<form className="container" onSubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					className="form-control"
					placeholder="New Todo"
					id="todo-input"
				/>
				<button
					type="submit"
					className="btn btn-primary mt-3"
					onClick={() => {
						const todoInput = document.querySelector(
							'#todo-input'
						) as HTMLInputElement;
						if (todoInput.value.trim() !== '') {
							const todo: Todo = {
								id: Date.now().toString(),
								text: todoInput.value.trim(),
							};
							handleAddTodo(todo);
							todoInput.value = '';
						}
					}}
				>
					Add Todo
				</button>
			</form>
			{todos.length > 0 || completedTodos.length > 0 ? (
				<ul>
					{/* render each todo item */}
					{todos.map((todo) => (
						<li key={todo.id}>
							<input
								type="radio"
								checked={completedTodos.indexOf(todo) !== -1}
								onChange={() => handleToggleTodo(todo)}
							/>
							<span>{todo.text}</span>
							<button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
						</li>
					))}
					{/* render each completed todo item */}
					{completedTodos.map((todo) => (
						<li key={todo.id}>
							<input
								type="radio"
								checked
								onChange={() => handleToggleTodo(todo)}
							/>
							<span style={{ textDecoration: 'line-through' }}>
								{todo.text}
							</span>
							<button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
						</li>
					))}
				</ul>
			) : (
				<p className="container mt-2">No Todos</p>
			)}
		</div>
	);
};

export default TodoApp;
