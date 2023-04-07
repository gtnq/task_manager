import React, { useEffect, useState } from "react";
import  Home  from "./admin";
import { Worker } from "./worker";
//import readFile from "fs"

let page = 'text';
let data = require("./data.json");

let admins = data.admin;
//let file = require('fs')
let workers = data.worker;

console.log(admins.length, workers.length, );
function auth(user, pw,setAdmin, setWorker) {
	let admin = false,
		worker = false,
		len;
	console.log(user, typeof(pw));
	if (admins.length < workers.length) {
		len = workers.length;
	} else {
		len = admins.length;
	}
	for (let i = 0; i < len; i++) {
		console.log(i, admins.length);
		if (admins.length > i) {
			console.log('admin check')
			console.log(admins[i].username === user, 'user',  admins[i].password === pw, "admin pw");
			if (admins[i].username === user && admins[i].password === pw) {
				admin = true;
				break;
			}
		} 
		if (i > workers.length) {
			console.log('worker check')
			console.log(workers[i].username === user, 'user',  workers[i].password === pw, "admin pw");


			if (workers[i].username === user && workers[i].password === pw) {

				worker = true;
				break;
			}
		}
	}
	console.log('bool', admin, worker)
	if (admin) {
		setAdmin(true)
	} else if (worker) {
		setWorker(true)
	} else {
		return alert('User Not found')
			
	}
	console.log(page)
}

export default function App() {
	const [user, setUser] = useState(""),
		[pw, setPw] = useState(""),
		[ad, setAdmin] = useState(false),
		[worker, setWorker] = useState(false);
	console.log(ad, 'aw')
	return (
		<>
			<div id="username">
				Username:
				<input
					id="user"
					onChange={(e) => setUser(e.target.value)}
				/>
			</div>
			<div id="password">
				Password
				<input
					id="pw"
					onChange={(e) => setPw(e.target.value)}
				/>
			</div>
			<button onClick={() => auth(user, pw, setAdmin, setWorker)}>Submit</button>
			<div>{ad && <Home />}</div>
			<div>{worker && <Worker />}</div>
		</>
	);
}
