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
		[dueTime, getDueTime] = useState("10:00");

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
	let DuesList = dues.map((items, ind) => (
		<div
			id={`dues_${ind}`}
			key={`dues_${ind}`}>
			{" "}
			{items}{" "}
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
	console.log(dueDate, "duedate");
	console.log(dueTime, "duetime");
	console.log(dues, 'dues');

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

			{/*
			<h2> dues </h2>
			<input type="textarea" id = 'dues_input'></input>
            <button id = 'save_tasks'>Save</button>
			
            */}
			<Calendar
				onChange={getDueDate}
				value={dueDate}
			/>
			<TimePicker
				onChange={getDueTime}
				value={dueTime}
			/>
			<button
				id="save_due"
				onClick={() =>
					addDues([...dues, { date: dueDate, time: dueTime }])
				}>
				Save
			</button>
			<div id="dues">{}</div>
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
