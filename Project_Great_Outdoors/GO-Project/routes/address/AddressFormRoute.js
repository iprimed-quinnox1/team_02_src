var express = require('express');
var router = express.Router();
var mon = require("../../db/AddressForm.js");
router.post('/AddressInitialization', function (request, response) {
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var myOb = request.body;
    mon.AddressInitialization(myOb,function callback(result) {
        response.send(result);
        console.log("callback execute");
        response.end();
    });
});
router.post('/AddressInsertion', function (request, response) {
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var ob = request.body;
    mon.AddressInsertion(ob, function (result) {
        response.send(result);
    });

});
router.post('/AddressDelete', function (request, response) {
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var ob = request.body.name;
    var data={Name:ob};
    mon.AddressDeletion(data, function (result) {
        response.send(result);
    });

});
router.post('/AddressDefaultSet', function (request, response) {
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var ob = request.body;
   
    mon.AddressDefaultSetdb(ob, function (result) {
        response.send(result);
    });

});
router.post('/AddressDefault', function (request, response) {
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var ob = request.body;
   
    mon.AddressDefaultdb(ob, function (result) {
        response.send(result);
    });

});
//export this router to use in our index.js
module.exports = router;