let express = require("express");
let mysql = require("mysql2");
let app = express();
let cors = require("cors");

app.use(cors());


const connection = mysql.createConnection({
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


module.exports = {connection}