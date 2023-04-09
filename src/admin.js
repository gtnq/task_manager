import React, { Component, useEffect, useState } from "react";
import Calendar from "react-calendar";
import App from "./App";
import axios from "axios";

function Admin(props) {
	const [tasks, addTasks] = useState([]),
		[selectTask, getSelectTask] = useState(),
		[current_task, setCurrentTask] = useState(""),
		//
		//
		[workers, addWorker] = useState([]),
		[current_workers, setCurrentWorker] = useState(""),
		[selected_workers, setSelectWorker] = useState([]),
		//
		//
		[dues, addDues] = useState([]),
		[finish, getFinish] = useState(),
		[dueDate, getDueDate] = useState(new Date()),
		//
		//
		[assignTask, setAssignTask] = useState(),
		[assignedTasks, setAssignedTask] = useState([]);

	const taskSql = props.taskSql;
	//console.log(props);
	useEffect(() => {
		addTasks(taskSql);
	}, []);
	const taskState = {
		tasks: tasks,
		addTasks: addTasks,
		selectTask: selectTask,
		getSelectTask: getSelectTask,
		current_task: current_task,
		setCurrentTask: setCurrentTask,
	};

	const workerState = {
		workers: workers,
		addWorker: addWorker,
		current_workers: current_workers,
		setCurrentWorker: setCurrentWorker,
		selected_workers: selected_workers,
		setSelectWorker: setSelectWorker,
	};

	const dueState = {
		dues: dues,
		addDues: addDues,
		finish: finish,
		getFinish: getFinish,
		dueDate: dueDate,
		getDueDate: getDueDate,
	};

	const assigningTasks = () => {
		if (finish && selected_workers.length && selectTask) {
			let t = selectTask,
				w = selected_workers,
				d = finish;
			const assignment = {
				task: t,
				worker: w,
				due: d,
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
			alert("please select something PLEASE");
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
	console.log(tasks, "tasks");
	return (
		<>
			<button onClick={() => assigningTasks()}>Save Selected</button>
			<Tasks tasks={taskState} />
			<Worker worker={workerState} />
			<Due dues={dueState} />
		</>
	);
}

function Tasks(props) {
	const {
		tasks,
		addTasks,
		selectTask,
		getSelectTask,
		current_task,
		setCurrentTask,
	} = props.tasks;

	const taskChecker = () => {
		console.log(current_task[0].task_name, "testchecker");

		if (!tasks.includes(current_task[0])) {
			addTasks([current_task[0], ...tasks]);
		}
	};
	/*
	const taskSql = props.tasksql;

	//console.log(taskSql);
	const useMountEffect =() => useEffect(() => {
		function taskSqlLoader() {
			taskSql.map((item) => {
				setCurrentTask([{ task_name: item.task_name }]);
				
				taskChecker(); 
				console.log(tasks)
			});
		}
		taskSqlLoader();
	}, []);
	useMountEffect()
	//console.log(taskssql)   */
	let tasksList = tasks.map((items, ind) => (
		<>
			<input
				type="checkbox"
				id={`tasks_${ind}`}
				key={`tasks_${ind}`}
				onChange={() => getSelectTask(items.task_name)}
				checked={selectTask === items.task_name}
			/>
			{items.task_name}
			<br />
		</>
	));

	return (
		<>
			<h2>tasks</h2>
			<input
				type="textarea"
				id="tasks_input"
				placeholder="One Task at a time please"
				onChange={(evt) =>
					setCurrentTask([{ task_name: evt.target.value }])
				}></input>
			<button
				id="save_tasks"
				onClick={() => taskChecker()}>
				Save
			</button>
			<br />
			<div id="tasks">{tasksList}</div>
		</>
	);
}

function Worker(props) {
	const {
		workers,
		addWorker,
		current_workers,
		setCurrentWorker,
		selected_workers,
		setSelectWorker,
	} = props.worker;

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
	return (
		<>
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
		</>
	);
}

function Due(props) {
	const { dues, addDues, finish, getFinish, dueDate, getDueDate } =
		props.dues;

	const dueChecker = () => {
		if (!dues.includes(dueDate)) addDues([...dues, dueDate]);
	};
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

	return (
		<>
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

class Load extends Component {
	constructor(props) {
		super(props);
		this.state = { tasksql: [], load: false, workersql: [] };
		this.admin = props.admin;
		this.log = props.log;
	}

	componentDidMount() {
		axios.get("http://localhost:8080/tasks").then((res) => {
			const data = res.data;
			console.log("startloading task");
			this.setState({ tasksql: data });
			console.log(this.state.tasksql, "task data");
		});
		axios.get("http://localhost:8080/workers").then((res) => {
			const data = res.data;
			console.log("startloading worker");
			this.setState({ workersql: data });
			this.setState({ load: true });
			console.log(this.state.workersql, "worker data");
		});
	}

	render() {
		//console.log(this.state.tasksql)
		return (
			<>
				<h1>Task Manager</h1>
				<button
					onClick={() => {
						this.admin(false);
						this.log(true);
					}}>
					return
				</button>

				{this.state.load && (
					<Admin
						taskSql={this.state.tasksql}
						workerSql={this.state.workersql}
					/>
				)}
			</>
		);
	}
}

export default function Home(props) {
	const [admin, setAdmin] = useState(true),
		[log, setLog] = useState(false);
	//console.log(props.return)
	return (
		<>
			{log && <App return={true} />}
			{admin && (
				<Load
					admin={setAdmin}
					log={setLog}
				/>
			)}
		</>
	);
}
