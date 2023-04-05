import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import TimePicker from "react-time-picker";


function Tasks() {
	return;
}

function Workers() {
	return;
}

function Dues() {
	return;
}

function Body() {
	const [tasks, addTasks] = useState([]),
		[workers, addWorker] = useState([]),
		[dues, addDues] = useState([]),
		[current_task, setCurrentTask] = useState(""),
		[current_workers, setCurrentWorker] = useState(""),
		[dueDate, getDueDate] = useState(new Date()),
		[desiredHour, getDesiredHour] = useState(),
		[desiredMinues, getDesiredMinues] = useState();
		//[dueTime, getDueTime] = useState(t);

	let tasksList = tasks.map((items, ind) => (
		<div
			id={`tasks_${ind}`}
			key={`tasks_${ind}`}>
			{" "}
			{items}{" "}
		</div>
	));

	let workerList = workers.map((items, ind) => (
		<div
			id={`workers_${ind}`}
			key={`workers_${ind}`}>
			{" "}
			{items}{" "}
		</div>
	));
	//console.log(dues)
	let duesList = dues.map((items, ind) => (
		
		<div
			id={`dues_${ind}`}
			key={`dues_${ind}`}>
			{" "}
			{items.toString()}{" "}
		</div>
	));
	//console.log(workers, 'worker')

	let addingworker = () => {
		console.log(workers);
		let arr = current_workers.split(",");
		for (let i = 0; i < arr.length; i++) {
			if (!workers.includes(arr[i])) {
				addWorker([arr[i], ...workers]);
			}
		}
	};
	//console.log(dueDate, "duedate");
	//console.log(dueTime, "duetime");
	//console.log(dues, "dues");
	let updateHour = (e) => {
		let dateitem = dueDate
		dateitem.setHours(e.target.value)
		console.log(dateitem)
		getDueDate(new Date(dateitem))

	}
	let updateMinutes = (e) => {
		let dateitem = dueDate
		console.log(dueDate)
		dateitem.setMinutes(e.target.value)
		console.log(dateitem)
		getDueDate(new Date(dateitem))
	}

	return (
		<>
			<h2>tasks</h2>
			<input
				type="textarea"
				id="tasks_input"
				placeholder="One Task at a time please"
				onChange={(evt) => setCurrentTask(evt.target.value)}></input>
			<button
				id="save_tasks"
				onClick={() => addTasks([current_task, ...tasks])}>
				Save
			</button>
			<div id="tasks">{tasksList}</div>
			<h2> workers </h2>
			<input
				type="textarea"
				id="workers_input"
				placeholder="comma after each worker please"
				onChange={(evt) => setCurrentWorker(evt.target.value)}></input>
			<button
				id="save_worker"
				onClick={() => addingworker()}>
				Save
			</button>
			<div id="workers">{workerList}</div>
			<h2> dues </h2>
			
			<Calendar
				onChange={getDueDate}
				value={dueDate}
			/>
			<input
				aria-label="Hour"
				data-input="true"
				inputMode="numeric"
				max="23"
				min="0"
				name="hour"
				placeholder="--"
				type="number"
				value= {dueDate.getHours()}
				onChange = {(evt)=> updateHour(evt)}
			/>
			{/* from https://projects.wojtekmaj.pl/react-time-picker/ */}
			<input
				data-input="true"
				inputMode="numeric"
				max="59"
				min="0"
				name="second"
				placeholder="--"
				type="number"
				value= {dueDate.getMinutes()}
				onChange = {(evt)=> updateMinutes(evt)}
			/>
			
			<button
				id="save_due"
				onClick={() =>
					addDues([...dues, dueDate])
				}>
				Save
			</button>
			<div id="dues">{duesList}</div>
		</>
	);
}

export default function App() {
	return (
		<>
			<h1> Task Manager </h1>
			<Body />
		</>
	);
}
