var master= require("../controllers/diffrentAddressController.server.js")
module.exports=function(app){
app.route("/addressmaster/getAddress").post(master.findAddress);
app.route("/addressmaster/getDefault").post(master.defaultAddress);
}
/*var express = require('express');
var router = express.Router();
var mon = require("../controllers/db_fetchCustomerAddress.js");

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



module.exports = router;*/