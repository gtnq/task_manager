import React, { useEffect, useState } from "react";
import Home from "./admin/admin";
import Worker from "./worker/worker";
import Login from "./login/login"
//import readFile from "fs"

let page = "text";
let data = require("./data.json");

let admins = data.admin;
//let file = require('fs')
let workers = data.worker;

//console.log(admins.length, workers.length);




export default function App(props) {
	const [ad, setAdmin] = useState(false),
		[worker, setWorker] = useState(false),
		[log, setLog] = useState(true),
		[loggedworker, setLoggedWorker] = useState(),
		[loggedAdmin, setLoggedAdmin] = useState();
	//console.log(props.return);
	return (
		<>
			{log && (
				<Login
					work={setWorker}
					admin={setAdmin}
					log={setLog}
					setLogedAdmin = {setLoggedAdmin}
					setLoggedWorker = {setLoggedWorker}
				/>
			)}
			<div>{ad && <Home adminid = {loggedAdmin}/>}</div>
			<div>{worker && <Worker workerid = {loggedworker}/>}</div>
		</>
	);
}



/*						subsitution by local import
	if (admins.length < workers.length) {
		len = workers.length;
	} else {
		len = admins.length;
	}
	for (let i = 0; i < len; i++) {
		//console.log(i, admins.length);
		if (admins.length > i) {
			//console.log("admin check");
			console.log(
				admins[i].username === user,
				"user",
				admins[i].password === pw,
				"admin pw"
			);
			if (admins[i].username === user && admins[i].password === pw) {
				admin = true;
				break;
			}
		}
		if (workers.length > i) {
			//console.log("worker check");
			console.log(
				workers[i].username === user,
				"user",
				workers[i].password === pw,
				"admin pw"
			);

			if (workers[i].username === user && workers[i].password === pw) {
				worker = true;
				break;
			}
		}
	}	*/