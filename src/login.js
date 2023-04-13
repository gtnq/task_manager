import React, { useEffect, useState } from "react";
import auth from "./login_auth"

export default function Login(props) {
	const [user, setUser] = useState(),
		[pw, setPw] = useState(),
		[adminData, setAdminData] = useState([]),
		[workerData, setWorkerData] = useState([])	
	const {setLoggedWorker, setLoggedAdmin} = props
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
					auth(user, pw, props.admin, props.work, props.log, adminData, workerData, setLoggedAdmin, setLoggedWorker);
				}}>
				Submits
			</button>
		</>
	);
}