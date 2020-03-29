//import express and burger.js to use its database functions
var express = require("express");
var router = express.Router();

var burger = require("../models/burger.js");

//routes and set up logic within each route 
router.get("/", function(req, res) {
    burger.selectAll(function(data){
        var handlebarsObject ={
            burgers:data
        };
        console.log(handlebarsObject);
        res.render("index", handlebarsObject);
    });
});

router.post("/api/burgers", function(req,res){
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result){
        //Send back the ID of the new burger
        res.json({id: result.insertId });
    });
});

router.put("/api/burgers/:id", function(req, res){
    var condition ="id = "+ req.params.id;

    console.log("condition", condition);

    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result){
        if (result.changedRows == 0) {
            //if no rows changed, then ID prob. doesnt exist and 404 error
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//Export routes for server.js file
module.exports = router;