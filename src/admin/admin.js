import React, { useState } from "react";

import App from "../App";
import Load from "./admin_load"

export default function Home(props) {
	const [admin, setAdmin] = useState(true),
		[log, setLog] = useState(false);
	//console.log(props.return)
	const people = props.adminName
	return (
		<>
			
			{log && <App return={true} />}
			{admin && (<h1 id = "current_user">Welcome {people}</h1>)}
			{admin && (
				<Load
					admin={setAdmin}
					log={setLog}
				/>
			)}
		</>
	);
}
