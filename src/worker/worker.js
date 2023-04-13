import React, { Component, useEffect, useState } from "react";
import App from "../App";



function CurrentTasks(props) {
    
	return <h2>Your Current Task</h2>;
}

function CompletedTasks(props) {
	return <h2>Your Completed Task</h2>;
}

class Workerpage extends Component {
	constructor(props) {
		super(props);
        this.state = {tasks:[]}
		this.worker = props.worker;
		this.log = props.log;
	}

	render() {
		return (
			<>
				<CurrentTasks />
				<button
					onClick={() => {
						this.worker(false);
						this.log(true);
					}}>
					return
				</button>

				<CompletedTasks />
			</>
		);
	}
}

export default function Worker(props) {
	const [worker, setWorker] = useState(true),
		[log, setLog] = useState(false);
	//console.log(props.return)
	return (
		<>
			{log && <App return={true} />}
			{worker && (
				<Workerpage
					worker={setWorker}
					log={setLog}
				/>
			)}
		</>
	);
}
