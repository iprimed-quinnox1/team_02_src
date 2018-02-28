var master = require("../controllers/productMasterController.server");

module.exports = function(app){
    app.route('/productMaster/allItems').get(master.allItems);
    app.route('/productMaster/createNew').post(master.createNew);
    app.route('/productMaster/updateTechSpec').post(master.updateTechSpec);
    app.route('/productMaster/deleteProduct').post(master.deleteProduct);
    app.route('/productMaster/deleteProductList').post(master.deleteProductList);
    app.route('/productMaster/getRecentItems').get(master.getRecentItems);
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

var mon = require("../controllers/db_productMasterDatabaseOp.js");

*/
/*
/allItems returns details of every product present in the database
*/
/*router.get('/allItems', function (request, response) {
 
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    mon.getAllProductList(function(result){
        response.send(result);
        response.end();
        console.log("whole data sent");
    });
   
});

router.post("/createNew",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var form = new formidable.IncomingForm();
    form.parse(request,function(err,fields,files){
        if(files)
        //console.log(files);
        //console.log(fields);
        var oldPath = files.file.path;
        var newPath = __dirname+"/uploads/"+files.file.name;
        //console.log(newPath);
        fs.rename(oldPath,newPath,function(err){
            if(err) throw err;
        });
        var ob = {_id:fields._id,name:fields.name,price:fields.price,img:files.file.name,techSpec:[]};
        //console.log(ob);
        mon.insertNewItem(ob,function(result){
            response.send(result);
            response.end();
            console.log("New Item Inserted");
        });
    });
});

router.post("/updateTechSpec",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var techSpecToAdd = request.body;
    mon.addTechSpec(techSpecToAdd,function(result){
        response.send(result);
        response.end();
        console.log("TechSpec Updated(added)");
    });
});

router.post("/DeleteProduct",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var itemToDelete = request.body;
    mon.deleteItem(itemToDelete,function(result){
        response.send(result);
        response.end();
        console.log("An Item Deleted");
    });
});

router.post("/DeleteProductList",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    techSpecToDelete = request.body;
    mon.deleteTechSpec(techSpecToDelete,function(result){
        response.send(result);
        response.end();
        console.log("TechSpec updated (removed)");
    });
});

module.exports = router;*/
