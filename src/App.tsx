import { useState, useRef, useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import pendingTodoImg from './assets/task-pending.png';
import successTodoImg from './assets/task-completed.png';

function App() {
	const [showInput, setShowInput] = useState(false);
	const inputRef = useRef<HTMLInputElement>(null);

	const storeDate = new Date().getDate();
	const storeYear = new Date().getFullYear();
	const month = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const myMonth = new Date();
	const storeMonth = month[myMonth.getMonth()];

	const day = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const myDay = new Date();
	const storeDay = day[myDay.getDay()];

	console.log(storeDay, storeDate, storeMonth, storeYear);

	const handlePlusClick = () => {
		setShowInput(true);
	};

	useEffect(() => {
		if (showInput) {
			inputRef.current?.focus();
		}
		const handleEscape = (event: KeyboardEvent) => {
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
						<div className="row date-container">
							<div className="col date-month-year">
								<span className="date">{storeDate}</span>
								<span className="month-year">
									{storeMonth}
									<p>{storeYear}</p>
								</span>
							</div>
							<div className="col">
								<span className="day">{storeDay}</span>
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
								<input type="text" placeholder="Add Your Todo" ref={inputRef} />
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
