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
const Assignment = function(t, w, d) {
	this.task = t
	this.workers = w
	this.due = d
}

function Body() {
	const [tasks, addTasks] = useState(['q']),
		[selectTask, getSelectTask] = useState(),
		[current_task, setCurrentTask] = useState(""),
		//
		//
		[workers, addWorker] = useState(['w']),
		[current_workers, setCurrentWorker] = useState(""),
		[selected_workers, setSelectWorker] = useState([]),
		//
		//
		[dues, addDues] = useState([new Date()]),
		[finish, getFinish] = useState(),
		[dueDate, getDueDate] = useState(new Date()),
		//
		//
		[assignTask, setAssignTask] = useState(),
		[assignedTasks, setAssignedTask] = useState([]);

	const assigningTasks = () => {
		if (finish && selected_workers.length && selectTask) {
			let t = selectTask, w = selected_workers, d = finish
			const assignment = {
				task: t,
				worker: w,
				due: d
			};
			console.log(assignment, "assignment");

			setAssignTask(assignment);
			setAssignedTask([assignTask, ...assignedTasks]);
			console.log(assignTask, "assignTask");
			console.log(assignedTasks, "assignedTasks");

			//
			let before_tasks = tasks,
				before_workers = workers,
				before_dues = dues;

			//
			let before_tasks_loc = before_tasks.indexOf(selectTask),
				before_workers_loc = before_workers.indexOf(selected_workers),
				before_dues_loc = before_dues.indexOf(finish);

			//
			before_tasks.splice(before_tasks_loc, 1);
			before_workers.splice(before_workers_loc, 1);
			before_dues.splice(before_dues_loc, 1);

			//
			addTasks(before_tasks);
			addWorker(before_workers);
			addDues(before_dues);
		} else {
			alert('please select something PLEASE')
		}
	};
	/*s
	const displayAssignment = assignedTasks.map((item, ind) => {
		<>
			<input
				type="checkbox"
				id={`assignment_${ind}`}
				key={`assignment_${ind}`}
			/>
			Task:{item.task}, Worker(s):
			{item.worker.map((name) => {
				<span>{name},</span>;
			})}{" "}
			Due Date and Time: {item.dues} <hr />
		</>;
	});
	*/

	let tasksList = tasks.map((items, ind) => (
		<>
			<input
				type="checkbox"
				id={`tasks_${ind}`}
				key={`tasks_${ind}`}
				onChange={() => getSelectTask(items)}
				checked={selectTask == items}
			/>
			{items}
			<br />
		</>
	));
	//console.log(workers, 'workers')

	//console.log(dues)
	let duesList = dues.map((items, ind) => (
		<>
			<input
				type="checkbox"
				id={`dues_${ind}`}
				key={`dues_${ind}`}
				onChange={() => getFinish(items.toString())}
				checked={finish == items.toString()}
			/>
			{items.toString()}
			<br />
		</>
	));
	//console.log(workers, 'worker')

	const addingworker = async () => {
		//console.log(workers);
		let arr = current_workers.trim().split(",");
		console.log(arr, "split arr");
		let worker = workers;
		//addWorker(arr, ...workers)
		//for (let i = 0; i < arr.length; i++) {
		arr.map((item) => {
			if (!worker.includes(item)) {
				console.log(item, "previous", worker);
				worker.push(item);
				console.log(item, worker, "status check");
				addWorker(worker);
				console.log(workers, "test adding result");
			}
		});
	};
	//console.log(dueDate, "duedate");
	//console.log(dueTime, "duetime");
	//console.log(dues, "dues");
	const updateHour = (e) => {
		let dateitem = dueDate;
		dateitem.setHours(e.target.value);
		console.log(dateitem);
		getDueDate(new Date(dateitem));
	};
	const updateMinutes = (e) => {
		let dateitem = dueDate;
		console.log(dueDate);
		dateitem.setMinutes(e.target.value);
		console.log(dateitem);
		getDueDate(new Date(dateitem));
	};

	let addSelection = (worker) => {
		if (!worker.checked) {
			let selected = selected_workers;
			let loc = selected.indexOf(worker.value);
			selected.splice(loc, 1);
			setSelectWorker(selected);
		} else {
			setSelectWorker([worker.value, ...selected_workers]);
		}
	};
	//console.log(selected_workers);
	const workerList = workers.map((items, ind) => (
		<div>
			{/*console.log(items, 'test worker add div')*/}
			<input
				type="checkbox"
				id={`workers_${ind}`}
				key={`workers_${ind}`}
				value={items}
				onChange={() =>
					addSelection(document.querySelector(`#workers_${ind}`))
				}
			/>
			{items}
			<br />
		</div>
	));

	const taskChecker = () => {
		if (!tasks.includes(current_task)) addTasks([current_task, ...tasks]);
	};

	const dueChecker = () => {
		if (!dues.includes(dueDate)) addDues([...dues, dueDate]);
	};

	return (
		<>
			<button onClick={() => assigningTasks()}>Save Selected</button>
			<h2>tasks</h2>
			<input
				type="textarea"
				id="tasks_input"
				placeholder="One Task at a time please"
				onChange={(evt) => setCurrentTask(evt.target.value)}></input>
			<button
				id="save_tasks"
				onClick={() => taskChecker()}>
				Save
			</button>
			<br />
			<div
				id="tasks"
				multiple>
				{tasksList}
			</div>

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
			<div
				id="workers"
				multiple>
				{workerList}
			</div>

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
				value={dueDate.getHours()}
				onChange={(evt) => updateHour(evt)}
			/>
			{/* from https://projects.wojtekmaj.pl/react-time-picker/ */}
			<input
				data-input="true"
				inputMode="numeric"
				max="60"
				min="0"
				name="minutes"
				placeholder="--"
				type="number"
				value={dueDate.getMinutes()}
				onChange={(evt) => updateMinutes(evt)}
			/>

			<button
				id="save_due"
				onClick={() => dueChecker()}>
				Save
			</button>
			<div id="dues">{duesList}</div>
			<hr />
			<h3 id="assigned">assigned_tasks</h3>
			<div id="list_assigned">{}</div>
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
