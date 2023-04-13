import React, { Component, useEffect, useState } from "react";

import axios from "axios";
import Admin from "./admin_body"



export default class Load extends Component {
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