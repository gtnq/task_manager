import React, { Component, useEffect, useState } from "react";

import App from "../App";
import Load from "./admin_load"

export default function Home(props) {
	const [admin, setAdmin] = useState(true),
		[log, setLog] = useState(false);
	//console.log(props.return)
	return (
		<>
			{log && <App return={true} />}
			{admin && (
				<Load
					admin={setAdmin}
					log={setLog}
				/>
			)}
		</>
	);
}
