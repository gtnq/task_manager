let mysql = require('mysql2')
let express = require('express')
let app = express()
let cors = require('cors')
let bodyParser = require("body-parser");

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/admins/:adminID?', function(req, res) {
   let data = []
   let statement = "SELECT * FROM admin";
   if (req.params.adminID != undefined) {
      statement += " WHERE id = ?"
      data = [req.params.adminID];
      console.log(statement)
   } else {
      statement += " ORDER BY id";
   }
   connection.query(statement, data, function(errQuery, rows) {
      if (errQuery) {
         console.log('err')
      } else if (rows) {
         console.log('successful, admins')
         res.json(rows)
      }else {
         console.log('id not found')
      }
   })
})

app.get('/workers/:workerID?', function(req, res) {
   let data = []
   let statement = "SELECT * FROM worker";
   if (req.params.workerID != undefined) {
      statement += " WHERE id = ?"
      data = [req.params.workerID];
      console.log(statement)
   } else {
      statement += " ORDER BY id";
   }
   connection.query(statement, data, function(errQuery, rows) {
      if (errQuery) {
         console.log('err')
      } else if (rows) {
         console.log('successful, workers')
         res.json(rows)
      }else {
         console.log('id not found')
      }
   })
})




let connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Ysc19981208",
    database: "task_manager"
});

 connection.connect(function(err) {
    console.log('Connecting to database...\n');
 
    // Handle any errors
    if (err) {
       console.log(err);
       console.log('Exiting application...\n');
    } else {
       console.log('Connected to database...\n');
       // Listen for connections
       // Note: Will terminate with an error if database connection
       // is closed
       const ip = 'localhost';
       const port = 8080;
       app.listen(port, ip, function () {
          try {
             console.log('Color server app listening on port ' + port);
          } catch (err) {
             console.log(err);
          }
       });
    }
 });