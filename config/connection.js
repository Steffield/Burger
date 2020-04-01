//Set up MySQL connection

var mysql = require("mysql");
var connection;

if (process.env.NODE_ENV === "production"){
  connection = mysql.createConnection(process.env.JAWSDB);
} else {
  connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "burgers_db"
  });
}

//Make connection
connection.connect(err=>{
    if(err){
        console.error("error connection: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

//Export connection for ORM use
module.exports = connection;