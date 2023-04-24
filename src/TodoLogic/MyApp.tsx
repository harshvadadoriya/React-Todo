// import { useEffect, useState } from 'react';
// import TodoItem from './TodoApp';

// const MyApp = () => {
// 	const [newTodoText, setNewTodoText] = useState('');
// 	const [todos, setTodos] = useState<string[]>([]);
// 	const [completedTodos, setCompletedTodos] = useState<string[]>([]);

// 	useEffect(() => {
// 		// Retrieve completed todos from local storage
// 		const storedCompletedTodos = localStorage.getItem('completedTodos');
// 		if (storedCompletedTodos !== null) {
// 			setCompletedTodos(JSON.parse(storedCompletedTodos));
// 		}
// 	}, []);

// 	useEffect(() => {
// 		// Save completed todos to local storage
// 		localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
// 	}, [completedTodos]);

// 	const handleAddTodo = (newTodo: string) => {
// 		setTodos([...todos, newTodo]);
// 	};

// 	return (
// 		<div>
// 			<h1>Todo List</h1>
// 			<form onSubmit={(event) => event.preventDefault()}>
// 				<label>
// 					New todo:
// 					<input
// 						type="text"
// 						onChange={(event) => setNewTodoText(event.target.value)}
// 					/>
// 				</label>
// 				<button onClick={() => handleAddTodo(newTodoText)}>Add</button>
// 			</form>
// 			<ul>
// 				{todos.map((todo, index) => (
// 					<TodoItem
// 						key={index}
// 						todo={todo}
// 						completed={completedTodos.includes(todo)}
// 					/>
// 				))}
// 			</ul>
// 		</div>
// 	);
// };

// export default MyApp;
