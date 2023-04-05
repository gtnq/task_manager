import React, { useEffect, useState } from "react";
import Calendar from 'react-calendar'
import TimePicker from 'react-time-picker'


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
	const [tasks, addTasks] = useState([]);
	const [workers, addWorker] = useState([]);
	const [dues, addDues] = useState([]);

	let tasksList = tasks.map((items, ind) => (
		<div id={`tasks_${ind}`}> {items} </div>
	));
	let workerList = workers.map((items, ind) => (
		<div id={`worker_${ind}`}> {items} </div>
	));
	let duesList = dues.map((items, ind) => (
		<div id={`dues_${ind}`}> {items} </div>
	));

	return (
		<>
			<h2>tasks</h2>
			<input type="textarea" id = 'tasks_input'></input>
            <button id = 'save_tasks'>Save</button>
			<div id="tasks">{tasksList}</div>


			<h2> workers </h2>
			<input type="textarea" id = 'workers_input'></input>
            <button id = 'save_tasks'>Save</button>
			<div id="workers">{workerList}</div>

            {/*
			<h2> dues </h2>
			<input type="textarea" id = 'dues_input'></input>
            <button id = 'save_tasks'>Save</button>
			
            */}
            <Calendar />
            <TimePicker />
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
