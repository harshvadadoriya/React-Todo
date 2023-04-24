import React, { useState, useRef, useEffect } from 'react';
import DateComponent from './DateComponent';
import TodoComponent from './TodoListComponent';
import TaskCompletedImg from '../assets/transparent/completing-tasks-unscreen.gif';

type Todo = {
	id: string;
	text: string;
	status: 'pending' | 'completed';
};

const TodoContainer: React.FC = (): JSX.Element => {
	const [todos, setTodos] = useState<Todo[]>([]);
	const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
	const [showInput, setShowInput] = useState(false);
	const inputRef: React.RefObject<HTMLInputElement> =
		useRef<HTMLInputElement>(null);

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
			// update the status of the clicked todo to "completed"
			updatedTodos[todoIndex].status = 'completed';
			updatedCompletedTodos.push(updatedTodos[todoIndex]);
			updatedTodos.splice(todoIndex, 1);
		}

		// else if (todoIndex === -1 && completedTodoIndex !== -1) {
		// 	// update the status of the clicked todo back to "pending"
		// 	updatedCompletedTodos[completedTodoIndex].status = 'pending';
		// 	updatedTodos.push(updatedCompletedTodos[completedTodoIndex]);
		// 	updatedCompletedTodos.splice(completedTodoIndex, 1);
		// }

		setTodos(updatedTodos);
		setCompletedTodos(updatedCompletedTodos);
		localStorage.setItem('todos', JSON.stringify(updatedTodos));
		localStorage.setItem(
			'completedTodos',
			JSON.stringify(updatedCompletedTodos)
		);
	};

	const handlePlusClick = (): void => {
		setShowInput(true);
	};

	useEffect(() => {
		if (showInput) {
			inputRef.current?.focus();
		}
		const handleEscape = (event: KeyboardEvent): void => {
			if (event.key === 'Escape') {
				setShowInput(false);
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [showInput]);

	return (
		<>
			<section className="main">
				<div className="mx-4 card">
					<div className="container">
						<DateComponent />
						{todos.length === 0 && completedTodos.length === 0 ? (
							<div className="todo-container task-completed">
								<img
									className="img-fluid"
									src={TaskCompletedImg}
									alt="All Task Completed"
								/>
							</div>
						) : (
							<div className="todo-container">
								{todos.map((todo) => (
									<TodoComponent
										key={todo.id}
										text={todo.text}
										status="pending"
										onToggle={() => handleToggleTodo(todo)}
										onRemove={() => handleRemoveTodo(todo.id)}
									/>
								))}
								{completedTodos.map((todo) => (
									<TodoComponent
										key={todo.id}
										text={todo.text}
										status="completed"
										onToggle={() => handleToggleTodo(todo)}
										onRemove={() => handleRemoveTodo(todo.id)}
									/>
								))}
							</div>
						)}

						{showInput ? (
							<div className="inputText">
								<input
									type="text"
									placeholder="Add Your Todo!"
									ref={inputRef}
									onKeyDown={(event) => {
										if (event.key === 'Enter') {
											const todoInput = event.target as HTMLInputElement;
											if (todoInput.value.trim() !== '') {
												const todo: Todo = {
													id: Date.now().toString(),
													text: todoInput.value.trim(),
													status: 'pending',
												};
												handleAddTodo(todo);
												todoInput.value = '';
												setShowInput(false);
											}
										}
									}}
								/>
							</div>
						) : (
							<div className="add-todo">
								<button className="plus" onClick={handlePlusClick}>
									<div className="add">
										<p>+</p>
									</div>
								</button>
							</div>
						)}
					</div>
				</div>
			</section>
		</>
	);
};

export default TodoContainer;
