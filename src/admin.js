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
		[firstname, setFirstname] = useState(""),
		[lastname, setLastname] = useState(""),
		[workers, setWorkers] = useState([]),
		[userName, setUsername] = useState(""),
		[passCode, setPassCode] = useState(""),
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

	const taskSql = props.taskSql,
		workerSql = props.workerSql;
	//console.log(props);
	//console.log(workerSql);
	useEffect(() => {
		addTasks(taskSql);
		setWorkers(workerSql);
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
		userName: userName,
		setUsername: setUsername,
		passCode: passCode,
		setPassCode: setPassCode,
		workers: workers,
		setWorkers: setWorkers,
		firstname: firstname,
		setFirstname: setFirstname,
		lastname: lastname,
		setLastname: setLastname,
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
			setWorkers(before_workers);
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
	//console.log(tasks, "tasks");
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
		userName,
		setUsername,
		passCode,
		setPassCode,
		firstname,
		setFirstname,
		workers,
		setWorkers,
		lastname,
		setLastname,
		selected_workers,
		setSelectWorker,
	} = props.worker;

	const addingworker = () => {
		//console.log(workers);
		//let arr = current_workers.trim().split(",");
		//console.log(arr, "split arr");
		let worker = {
			firstName: firstname,
			lastName: lastname,
			userName: userName,
			passCode: passCode,
		};
		//addWorker(arr, ...workers)
		//for (let i = 0; i < arr.length; i++) {
		let adding = true;
		workers.map((item) => {
			//console.log(worker.firstName == item.firstName ,' and ',worker.lastName ==item.lastName)
			if (
				worker.firstName == item.firstName &&
				worker.lastName == item.lastName
			) {
				adding = false;
			}
			//console.log(adding)
		});
		if (adding) {
			console.log("added?");
			setWorkers([...workers, worker]);
			postWorker(worker);
		}
	};

	const postWorker = (worker) => {
		axios
			.post("http://localhost:8080/workers", worker)
			.then((res) => console.log(res));
	};
	const deleteWorker = (worker) => {
		
		
		let current = workers
		let before_workers_loc = workers.indexOf(worker)
		current.splice(before_workers_loc, 1);
		setWorkers(current)
		
		if(worker.id == undefined)
			worker.id = 1
		axios
			.delete(`http://localhost:8080/workers/${worker.id} `)
			.then((res) => console.log(res));

	};			//need to delete the usestate datas

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
				value={items.firstName + " " + items.lastName}
				onChange={() =>
					addSelection(document.querySelector(`#workers_${ind}`))
				}
			/>
			{items.firstName + " " + items.lastName}
			<button onClick={() =>deleteWorker(items)}>Remove</button>
			<br />
		</div>
	));

	return (
		<>
			<h2> workers </h2>
			<input
				type="textarea"
				id="workerFirstname"
				placeholder="First_name"
				onChange={(evt) => setFirstname(evt.target.value)}></input>
			<input
				type="textarea"
				id="workerLirstname"
				placeholder="Last_name"
				onChange={(evt) => setLastname(evt.target.value)}></input>
			<input
				type="textarea"
				id="workerUserID"
				placeholder="worker's login here"
				onChange={(evt) => setUsername(evt.target.value)}></input>
			<input
				type="textarea"
				id="workerpassword"
				placeholder="worker's password here"
				onChange={(evt) => setPassCode(evt.target.value)}></input>
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
			//console.log("startloading task");
			this.setState({ tasksql: data });
			//console.log(this.state.tasksql, "task data");
		});
		axios.get("http://localhost:8080/workers").then((res) => {
			let data = res.data;

			//console.log("startloading worker");
			this.setState({ workersql: data });
			this.setState({ load: true });
			//console.log(this.state.workersql, "worker data");
			//this.modifyWorker()
		});
	}
	modifyWorker(items) {
		const data = items;
		let arr = [];
		data.map((item) => {
			let str = `${item.firstName} ${item.lastName}`;
			arr.push(str);
		});
		//console.log(arr, "modified worker");
		this.setState({ workerSql: arr });
	}

	render() {
		//console.log(this.state.workersql);
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
