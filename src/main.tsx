import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import TodoApp from './TodoLogic/TodoApp.tsx';
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<App />
		{/* <TodoApp /> */}
	</React.StrictMode>
);
