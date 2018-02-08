var express = require('express');
var router = express.Router();
var mon = require("../../db/db_orderDetails.js");

router.post("/orderInitialization",function(request,response){
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var ob= request.body.customerId;
mon.orderDetailInitialization(ob,function(callback){
    response.send(callback);
    response.end();
});
});
router.post("/orderDeletion",function(request,response){
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var ob=request.body;
    mon.orderDetailDeletion(ob,function(callback){
response.send(callback);
response.end();
    });
});
//export this router to use in our index.js
module.exports = router;