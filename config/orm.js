//Import mysQL connection
var connection = require("../config/connection.js");


//helper function for SQL syntax
function printQuestionMarks(num){
    var arr =[];

    for(var i=0; i<num; i++){
        arr.push("?");
    }
    return arr.toString();
}

//helper function to convert obj key/value pairs to SQL syntax
function objToSql(obj){
    var arr =[];

    //loop through keys and push the key/value as string into array
    for(var key in obj){
        var value =obj[key];
        //check to skip hidden properties
        if(Object.hasOwnProperty.call(obj, key)){
            //if string with spaces, add quotation
            if(typeof value === "string" && value.indexOf(" ") >= 0){
                value ="'" + value +"'";
            }
            arr.push(key+"=" +value);
        }
    }
    //translate array of strings to single comma-separated string
    return arr.toString();
}

//Object for all SQL statement functions
var orm ={
    selectAll: function(tableInput, cb){
        var queryString="SELECT * FROM " + tableInput + ";";
        connection.query(queryString, (err, result)=>{
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function(table, cols, vals, cb){
        var queryString="INSERT INTO " + table;

        queryString += " (";
        queryString += cols.toString();
        queryString += ")";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.length);
        queryString += ") ";

        console.log(queryString);

        connection.query(queryString, vals, (err, result)=>{
            if(err){
                throw err;
            }
            cb(result);
        });
    },
    updateOne: function(table, objColVals, condition, cb){
        var queryString="UPDATE " + table; 

        queryString += " SET ";
        queryString += objToSql(objColVals);
        queryString += " WHERE ";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, (err, result)=>{
            if(err){
                throw err;
            }
            cb(result);
        });
    },
}

//Export the ORM object for the model burger.js
module.exports = orm;