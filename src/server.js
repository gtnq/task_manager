let mysql = require("mysql2");
let express = require("express");
let app = express();
let cors = require("cors");
let bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/admins/:adminID?", function (req, res) {
	let data = [];
	let statement = "SELECT * FROM admin";
	if (req.params.adminID != undefined) {
		statement += " WHERE id = ?";
		data = [req.params.adminID];
		console.log(statement);
	} else {
		statement += " ORDER BY id";
	}
	connection.query(statement, data, function (errQuery, rows) {
		if (errQuery) {
			console.log("err");
		} else if (rows) {
			console.log("successful, admins");
			res.json(rows);
		} else {
			console.log("id not found");
		}
	});
});

app.get("/workers/:workerID?", function (req, res) {
	let data = [];
	let statement = "SELECT * FROM worker";
	if (req.params.workerID != undefined) {
		statement += " WHERE id = ?";
		data = [req.params.workerID];
		console.log(statement);
	} else {
		statement += " ORDER BY id";
	}
	connection.query(statement, data, function (errQuery, rows) {
		if (errQuery) {
			console.log("err");
		} else if (rows) {
			console.log("successful, workers");
			res.json(rows);
		} else {
			console.log("id not found");
		}
	});
});

app.get("/tasks/:taskID?", function (req, res) {
	let data = [];
	let statement = "SELECT * FROM tasks";
	if (req.params.taskID != undefined) {
		statement += " WHERE id = ?";
		data = [req.params.taskID];
		console.log(statement);
	} else {
		statement += " ORDER BY id";
	}
	connection.query(statement, data, function (errQuery, rows) {
		if (errQuery) {
			console.log("err");
		} else if (rows) {
			console.log("successful, tasks");
			res.json(rows);
		} else {
			console.log("id not found");
		}
	});
});

app.post("/tasks", function (req, res) {
	console.log("Route /tasks POST");
	let sql = `call addTasks("${req.body.task_name}")`;
	
      connection.query(sql, function (errQuery, result) {
         if (errQuery) {
            console.log(errQuery);
            res.json({ status: "Error", err: errQuery });
         } else {
            //console.log("Insert ID: ", result.insertId);
            res.json({ status: sql, err: "" });
         }
      });
   }
);

app.post("/workers", function (req, res) {
	console.log("Route /workers POST");
	let sql = `call addWorker("${req.body.firstName}","${req.body.lastName}","${req.body.userName}","${req.body.passCode}")`;
	
   
   
      connection.query(sql, function (errQuery, result) {
         if (errQuery) {
            console.log(errQuery);
            res.json({ status: "Error", err: errQuery });
         } else {
            //console.log("Insert ID: ", result.insertId);
            res.json({ status: sql, err: "" });
         }
      });
   }
);

app.delete("/workers/:workerID?", function (req, res) {
	console.log("Route /workers Delete");
	let sql = "call deleteWorker(?)";
	
   if(req.params.workerID != undefined) {
      let data = [req.params.workerID]
   
      connection.query(sql, data, function (errQuery, result) {
         if (errQuery) {
            console.log(errQuery);
            res.json({ status: "Error", err: errQuery });
         } else {
            //console.log("Insert ID: ", result.insertId);
            res.json({ status: data, err: "" });
         }
      });
   }
});

let connection = mysql.createConnection({
	host: "localhost",
	port: "3306",
	user: "root",
	password: "Ysc19981208",
	database: "task_manager",
});

connection.connect(function (err) {
	console.log("Connecting to database...\n");

	// Handle any errors
	if (err) {
		console.log(err);
		console.log("Exiting application...\n");
	} else {
		console.log("Connected to database...\n");
		// Listen for connections
		// Note: Will terminate with an error if database connection
		// is closed
		const ip = "localhost";
		const port = 8080;
		app.listen(port, ip, function () {
			try {
				console.log("Color server app listening on port " + port);
			} catch (err) {
				console.log(err);
			}
		});
	}
});
