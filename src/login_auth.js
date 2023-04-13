

export default function auth(user, pw, setAdmin, setWorker, setLog, adminsql = [], workersql = [],setLoggedAdmin, setLoggedWorker) {
	let admin = false,
		worker = false,
		len, loginName;

		if (adminsql.length < workersql.length) {
			len = workersql.length;
		} else {
			len = adminsql.length;
		}
		for (let i = 0; i < len; i++) {
			//console.log(i, admins.length);
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
					loginName = adminsql[i].firs
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
	//console.log(page);
}
