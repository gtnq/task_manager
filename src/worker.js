import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import App from "./App";


 function Workerpage(props) {
    return (
        <>
            <h2>Your Current Task</h2>            
            <button onClick = {() => {props.worker(false); props.log(true)}}>return</button>

            <h2>Your Completed Task</h2>
        </>
    )
}


export default function Worker(props) {
    const [worker, setWorker] = useState(true),
		[log, setLog] = useState(false);
	//console.log(props.return)
	return (
		<>
            {log && <App return = {true} />}
			{worker && <Workerpage worker = {setWorker} log = {setLog}/> }
		</>
	);
}