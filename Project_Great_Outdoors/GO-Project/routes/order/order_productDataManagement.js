var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var fs = require("fs");

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mon = require("../../db/db_ProductDataManagement")

router.post("/getData",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var ob = request.body;
    
    var queryObject = {"_id":ob.datas};
    mon.findItemById(queryObject,function(result){
        response.send(result);
        response.end();
        console.log("Searched item values transfered");
    });
});
router.get("/getProductData",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    console.log("getProductData")
    
    mon.ProductData(function callback(result) {
        response.send(result);
        console.log("callback execute");
        response.end();
    });
});
module.exports = router;