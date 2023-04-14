let mysql = require("mysql2");
let express = require("express");
let app = express();

app.get("/assign/:assignID?", function (req, res) {
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

app.post("/assign", function (req, res) {
	console.log("Route /assign POST");
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