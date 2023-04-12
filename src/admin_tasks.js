import React, { Component, useEffect, useState } from "react";
import axios from "axios";


export default function Tasks(props) {
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
			addTasks([...tasks, current_task[0]]);
			axios
				.post(`http://localhost:8080/tasks`, current_task[0])
				.then((res) => console.log(res));
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
				onChange={() => {
					console.log(items, 'wooot');
					getSelectTask(items.task_name)
				}}
				checked={selectTask === items.task_name}
			/>
			{/*console.log(selectTask) saved*/}
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
