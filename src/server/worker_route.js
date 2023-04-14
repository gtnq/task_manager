let mysql = require("mysql2");
let express = require("express");
let app = express();

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