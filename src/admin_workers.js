import axios from "axios";
import React, { Component, useEffect, useState } from "react";


export default function Worker(props) {
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
		let current = workers;
		let before_workers_loc = workers.indexOf(worker);
		current.splice(before_workers_loc, 1);
		setWorkers(current);

		if (worker.id == undefined) worker.id = 1;
		axios
			.delete(`http://localhost:8080/workers/${worker.id} `)
			.then((res) => console.log(res));
	}; //need to delete the usestate datas

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
			<button onClick={() => deleteWorker(items)}>Remove</button>
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
