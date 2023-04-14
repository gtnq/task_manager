let mysql = require("mysql2");
let express = require("express");
let app = express();



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
