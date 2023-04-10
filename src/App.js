import React, { useEffect, useState } from "react";
import Home from "./admin";
import Worker from "./worker";
//import readFile from "fs"

let page = "text";
let data = require("./data.json");

let admins = data.admin;
//let file = require('fs')
let workers = data.worker;

//console.log(admins.length, workers.length);

function auth(user, pw, setAdmin, setWorker, setLog, adminsql = [], workersql = []) {
	let admin = false,
		worker = false,
		len;

		if (adminsql.length < workersql.length) {
			len = workersql.length;
		} else {
			len = adminsql.length;
		}
		for (let i = 0; i < len; i++) {
			console.log(i, admins.length);
			if (adminsql.length > i) {
				console.log("admin check");
				console.log(
					adminsql[i].userName === user,
					"user",
					adminsql[i].password === pw,
					"admin pw"
				);
				if (adminsql[i].userName === user && adminsql[i].password === pw) {
					admin = true;
					break;
				}
			}
			if (workersql.length > i) {
				console.log("worker check");
				console.log(
					workersql[i].userName === user,
					"worker",
					workersql[i].passCode +','+ pw,
					"worker pw"
				);
	
				if (workersql[i].userName === user && workersql[i].passCode === pw) {
					worker = true;
					break;
				}
			}
		}

	console.log("bool", admin, worker);
	if (admin) {
		setAdmin(true);
		setLog(false);
	} else if (worker) {
		setWorker(true);
		setLog(false);
	} else {
		return alert("User Not found");
	}
	console.log(page);
}

function Login(props) {
	const [user, setUser] = useState(),
		[pw, setPw] = useState(),
		[adminData, setAdminData] = useState([]),
		[workerData, setWorkerData] = useState([])
	//console.log(user, typeof pw);
	useEffect(() => {
		fetch("http://localhost:8080/admins")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				//console.log(typeof data);
				setAdminData(data);
			});
	}, []);

	useEffect(() => {
		fetch("http://localhost:8080/workers")
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				//console.log(typeof data);
				setWorkerData(data);
			});
	}, []);

	//console.log(adminData, "admin");
	//console.log(workerData, "worker");
	if (props.adminPage) {
		props.adminPage(false);
	}
	return (
		<>
			<div id="username">
				Username:
				<input
					id="user"
					onChange={(e) => setUser(e.target.value)}
					placeholder="Your Username Please"
				/>
			</div>
			<div id="password">
				Password
				<input
					id="pw"
					onChange={(e) => setPw(e.target.value)}
					placeholder="Your Password Here"
				/>
			</div>
			<button
				onClick={() => {
					auth(user, pw, props.admin, props.work, props.log, adminData, workerData);
				}}>
				Submits
			</button>
		</>
	);
}

export default function App(props) {
	const [ad, setAdmin] = useState(false),
		[worker, setWorker] = useState(false),
		[log, setLog] = useState(true);
	//console.log(props.return);
	return (
		<>
			{log && (
				<Login
					work={setWorker}
					admin={setAdmin}
					log={setLog}
				/>
			)}
			<div>{ad && <Home />}</div>
			<div>{worker && <Worker />}</div>
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