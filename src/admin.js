import React, { Component, useEffect, useState } from "react";

import Worker from "./admin_workers"
import Tasks from "./admin_tasks"
import App from "./App";
import axios from "axios";
import Due from "./admin_calendar"
import Assign from "./admin_assign"

function Admin(props) {
	const [tasks, addTasks] = useState([]),
		[selectTask, getSelectTask] = useState(), //THis one
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
		[assignTask, setAssignTask] = useState("we out here"),
		[assignedTasks, setAssignedTask] = useState([]);

	const taskSql = props.taskSql,
		workerSql = props.workerSql;
	//console.log(props);
	//console.log(workerSql);
	// useEffect(() => {
	// 	addTasks(taskSql);
	// 	setWorkers(workerSql);
	// }, []);

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

	const assignState = {
		assignTask: assignTask,
		setAssignTask: setAssignTask,
		assignedTasks: assignedTasks,
		setAssignedTask: setAssignedTask,
		finish: finish,
		selected_workers: selected_workers,
		selectTask: selectTask,
	};

	console.log(assignState);

	return (
		<>
			<Assign assigns={assignState} />
			<Tasks tasks={taskState} />
			<Worker worker={workerState} />
			<Due dues={dueState} />
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
