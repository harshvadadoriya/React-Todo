import React, { useState, useRef, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import pendingTodoImg from './assets/task-pending.png';
import successTodoImg from './assets/task-completed.png';

function App() {
	const [showInput, setShowInput] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const handlePlusClick = () => {
		setShowInput(true);
	};

	const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Escape') {
			setShowInput(false);
		}
	};

	useEffect(() => {
		if (showInput) {
			inputRef.current?.focus();
		}
	}, [showInput]);

	return (
		<>
			<section className="main">
				<div className="mx-2 card">
					<div className="container">
						<div className="row date-container">
							<div className="col date-month-year">
								<span className="date">12</span>
								<span className="month-year">
									Jan<p>2022</p>
								</span>
							</div>
							<div className="col">
								<span className="day">Tuesday</span>
							</div>
						</div>
						<div className="todo-container ">
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={pendingTodoImg}
										alt="pending"
									/>
								</div>
							</div>
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={pendingTodoImg}
										alt="pending"
									/>
								</div>
							</div>
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={successTodoImg}
										alt="pending"
									/>
								</div>
							</div>
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={successTodoImg}
										alt="pending"
									/>
								</div>
							</div>
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={successTodoImg}
										alt="pending"
									/>
								</div>
							</div>
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={pendingTodoImg}
										alt="pending"
									/>
								</div>
							</div>
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={pendingTodoImg}
										alt="pending"
									/>
								</div>
							</div>
							<div className="todo">
								<div className="todo-list">
									<span>Go To Gym!</span>
									<img
										className="todo-status"
										src={successTodoImg}
										alt="pending"
									/>
								</div>
							</div>
						</div>
						{showInput ? (
							<div className="inputText">
								<input
									type="text"
									placeholder="Add Your Todo"
									onKeyDown={handleKeyPress}
									ref={inputRef}
								/>
							</div>
						) : (
							<button className="plus" onClick={handlePlusClick}>
								<div className="add">
									<p>+</p>
								</div>
							</button>
						)}
					</div>
				</div>
			</section>
		</>
	);
}

export default App;
