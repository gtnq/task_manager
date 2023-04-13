import React, { Component, useEffect, useState } from "react";
import Calendar from "react-calendar";


export default function Due(props) {
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