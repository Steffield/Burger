//Import ORM to create function that interacts with database
var orm = require("../config/orm.js");

var burger ={
    selectAll: function (cb){
        orm.selectAll("burgers", function(res){
            cb(res);
        });
    },
    //cols and vals are arrays
    insertOne: function(cols, vals, cb){
        orm.insertOne("burgers", cols, vals, function(res){
            cb(res);
        });
    },
    updateOne: function(objColVals, condition, cb) {
        orm.updateOne("burgers", objColVals, condition, function(res){
            cb(res);
        })
    }

};


// export database functions for the controller-->burgers_controller.js
module.exports = burger;