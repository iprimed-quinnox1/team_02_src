/*
    logisticRouter.js take care of every valid route redirected using /route/

*/

var express = require('express');
var router = express.Router();



var mon = require("../../db/db_logisticDatabaseOp");

router.get("/getAllData", function (request, response) {
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    mon.getAllData(function (result) {
        //console.log(result);
        response.send(result);
        response.end();
        console.log("Whole order data sent");
    });
});


router.post("/updateStatus", function (request, response) {
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    //console.log("from router");
    //console.log("updateStatus body: " + request.body);
    var ob = request.body;
    mon.updateStatus(ob, function (result) {
        response.send(result);
        response.end();
        console.log("Status updated successfully");
    });
});

module.exports = router;