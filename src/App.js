import React, { useEffect, useState } from "react";
import {Admin} from "./admin"
import {Worker} from "./worker"

function auth() {
	let yes =false

	if (yes) {
		return (
			<>
				<h1>Task Manager </h1>
				<Admin />
			</>
		)
 	} else {
		return (
			<>	
				<h1>Task Reader</h1>
				<Worker />
			</>
		)
	}
}

export default function App() {
	return (
		<>
			<Admin />
		</>
	);
}
