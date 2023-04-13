import React, { Component, useEffect, useState } from "react";

import Worker from "./admin_workers"
import Tasks from "./admin_tasks"
import Due from "./admin_calendar"
import Assign, { DisplayAssignment } from "./admin_assign"



export default function Admin(props) {
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

	const assignState = {
		assignTask: assignTask,
		setAssignTask: setAssignTask,
		assignedTasks: assignedTasks,
		setAssignedTask: setAssignedTask,
		finish: finish,
		selected_workers: selected_workers,
		selectTask: selectTask,
	};

	//console.log(assignState);

	return (
		<>
			<Assign assigns={assignState} />
			<Tasks tasks={taskState} />
			<Worker worker={workerState} />
			<Due dues={dueState} />
			<DisplayAssignment assignedtask = {assignedTasks} />
		</>
	);
}
