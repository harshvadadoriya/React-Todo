import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';

type Todo = {
	id: string;
	text: string;
};

const TodoApp = () => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

	useEffect(() => {
		const storedTodos = JSON.parse(localStorage.getItem('todos') || '[]');
		const storedCompletedTodos = JSON.parse(
			localStorage.getItem('completedTodos') || '[]'
		);
		setTodos(storedTodos);
		setCompletedTodos(storedCompletedTodos);

		const currentDate = new Date().toLocaleDateString();
		const storedDate = localStorage.getItem('date');
		if (currentDate !== storedDate) {
			localStorage.removeItem('todos');
			localStorage.removeItem('completedTodos');
			setTodos([]);
			setCompletedTodos([]);
		}
		localStorage.setItem('date', currentDate);
	}, []);

	const handleAddTodo = (todo: Todo) => {
		const updatedTodos = [...todos, todo];
		setTodos(updatedTodos);
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
	};

	const handleRemoveTodo = (id: string) => {
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

	const handleToggleTodo = (todo: Todo) => {
		const updatedTodos = [...todos];
		const updatedCompletedTodos = [...completedTodos];
		const todoIndex = updatedTodos.findIndex((t) => t.id === todo.id);
		const completedTodoIndex = updatedCompletedTodos.findIndex(
			(t) => t.id === todo.id
		);

		if (todoIndex !== -1 && completedTodoIndex === -1) {
			updatedTodos.splice(todoIndex, 1);
			updatedCompletedTodos.push(todo);
		} else if (todoIndex === -1 && completedTodoIndex !== -1) {
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

	return (
		<div>
			<h1 className="container">Todo List</h1>
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
				<p>No Todos</p>
			)}
		</div>
	);
};

export default TodoApp;
