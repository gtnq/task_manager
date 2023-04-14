import React, { Component, useEffect, useState } from "react";
import App from "../App";
import WorkerManage from "./worker_split";

class Workerpage extends Component {
	constructor(props) {
		super(props);
		this.state = { tasks: [] };
		this.worker = props.worker;
		this.log = props.log;
		this.id = props.id;
	}

	render() {
		return (
			<>
				<button
					onClick={() => {
						this.worker(false);
						this.log(true);
					}}>
					return
				</button>
				<WorkerManage />
			</>
		);
	}
}

export default function Worker(props) {
	const [worker, setWorker] = useState(true),
		[log, setLog] = useState(false);
	//console.log(props.return)
	const workerinfo = props.workerInfo;
	return (
		<>
			{log && <App return={true} />}
			{worker && (
				<h1 id="current_user">
					{workerinfo.firstName + " " + workerinfo.lastName}
				</h1>
			)}
			{worker && (
				<Workerpage
					worker={setWorker}
					log={setLog}
					id={workerinfo.id}
				/>
			)}
		</>
	);
}
