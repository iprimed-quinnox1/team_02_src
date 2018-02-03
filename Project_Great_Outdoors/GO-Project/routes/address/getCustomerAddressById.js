var express = require('express');
var router = express.Router();
var mon = require("../../db/fetchCustomerAddress.js");

router.post("/getAddress",function(request,response){
    //console.log(request.body);
    var ob = request.body;
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });

    mon.findAddress(ob,function(result){
        response.send(result);
    });
  //  getAddressOfCustomer(ob,function(result){
   //     console.log(result);
   // });
    
});

router.post("/getDefault",function(request,response){
    var ob = request.body;
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    mon.defaultAddress(ob,function(result){
        response.send(result);
    });
    //var ob = request.body;
    //response.send(ob);
});



module.exports = router;