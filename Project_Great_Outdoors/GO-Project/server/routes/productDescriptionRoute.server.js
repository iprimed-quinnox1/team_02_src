var productPageServerSideController = require("../controllers/productPageController.server");

module.exports = function (app) {
    app.route("/productDescription/getData").post(productPageServerSideController.getData);
    app.route("/productDescription/registerComment").post(productPageServerSideController.registerComment);
    app.route("/productDescription/feedBackData").post(productPageServerSideController.feedBackData);
}

/*var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var fs = require("fs");

var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

var mon = require("../controllers/db_productDescriptionDatabaseOp.js");

router.post("/getData",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var ob = request.body;
    var queryObject = {_id:ob.lastSearchedPid};
    mon.findItemById(queryObject,function(result){
        response.send(result);
        response.end();
        console.log("Searched item values transfered");
    });
});


router.post("/registerComment",function(request,response){
    //console.log("reached");
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var commentToRegister = request.body;
    //console.log("In the route"+commentToRegister);
    mon.registerComment(commentToRegister,function(result){
        response.send(result);
        response.end();
        console.log("feedback registered");
    });
});
router.post("/feedBackData",function(request,response){
    //console.log("reached");
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var commentToRegister = request.body.userid;

    console.log("In the route"+commentToRegister);
    mon.feedbackData(commentToRegister,function(result){
        response.send(result);
        response.end();
        console.log("feedback fetched");
    });
});

module.exports = router;*/