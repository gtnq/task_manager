import React, { Component, useEffect, useState } from "react";

export default function Assign(props) {
	const {
		assignTask,
		setAssignTask,
		assignedTasks,
		setAssignedTask,
		finish,
		selected_workers,
		selectTask,
	} = props.assigns;

	const assigningTasks = () => {
		console.log("im happening", selectTask);

		const assignment = {
			task: selectTask,
			worker: selected_workers,
			due: finish,
		};
		console.log(assignment, "assignments object");

		setAssignTask(assignment);
		console.log(assignedTasks);
		setAssignedTask([assignment, ...assignedTasks]);
		console.log(assignTask, "assignTaskakjdfhaskjfhas");
		console.log(assignedTasks, "assignedTasks");
	};
	// const assigningTasks = () => {
	// 	//console.log(finish, selected_workers, selectTask)
	// 	if (finish && selected_workers.length && selectTask) {

	// console.log(assignment, "assignment");

	// setAssignTask(assignment);
	// setAssignedTask([assignment, ...assignedTasks]);
	// console.log(assignTask, "assignTask");
	// console.log(assignedTasks, "assignedTasks");

	// 		/*
	// 		let before_tasks = tasks,
	// 			before_workers = workers,
	// 			before_dues = dues;

	// 		//
	// 		let before_tasks_loc = before_tasks.indexOf(selectTask),
	// 			before_workers_loc = before_workers.indexOf(selected_workers),
	// 			before_dues_loc = before_dues.indexOf(finish);

	// 		//
	// 		before_tasks.splice(before_tasks_loc, 1);
	// 		before_workers.splice(before_workers_loc, 1);
	// 		before_dues.splice(before_dues_loc, 1);

	// 		//
	// 		addTasks(before_tasks);
	// 		setWorkers(before_workers);
	// 		addDues(before_dues); */
	// 	} else {
	// 		alert("please select something PLEASE");
	// 	}
	// };

	// const displayAssignment = assignedTasks.map((item, ind) => {
	// 	return (
	// 		<>
	// 			<input
	// 				type="checkbox"
	// 				id={`assignment_${ind}`}
	// 				key={`assignment_${ind}`}
	// 			/>
	// 			Task:{item.task}, Worker(s):
	// 			{item.worker.map((name) => {
	// 				<span>{name},</span>;
	// 			})}{" "}
	// 			Due Date and Time: {item.due} <hr />
	// 		</>
	// 	);
	// });

	//console.log(tasks, "tasks");
	return (
		<>
			<button onClick={() => assigningTasks()}>Save Selected</button>
			{/* {displayAssignment}; */}
		</>
	);
}

export function DisplayAssignment(props) {
	const displayAssignment = props.assignedtask.map((item, ind) => {
		return (
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
				Due Date and Time: {item.due} <hr />
			</>
		);
	});

	return <>{displayAssignment}</>;
}
