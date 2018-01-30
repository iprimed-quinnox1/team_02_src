var express = require("express");
var formidable = require("formidable");
var fs = require("fs");
var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";


var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/productMaster",express.static(__dirname));
app.use("/",express.static(__dirname+"/abhi"));
app.use("/",express.static(__dirname+"/abhi/images"));


//------------------------- Routes Handler ----------------------------


app.get("/init",function(request,response){
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    MongoClient.connect(url, function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        res.find().toArray(function(err,result){
            if(err) throw err;
            response.send(result);
            //console.log(result);
            response.end();
            console.log("whole data sent");
        });
        database.close();
    });
});


app.post("/createNew",function(request,response){
    response.set({
        'Content-Type' :'application/json',
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Credentials":true
    });
    var form = new formidable.IncomingForm();
    form.parse(request,function(err,fields,files){
        //console.log(fields);
        //console.log(files);
        if(files)
        var oldPath = files.file.path;
        var newPath = __dirname+"/abhi/images/"+files.file.name;
        fs.rename(oldPath,newPath,function(err){
            if(err) throw err;
        });
        var ob = {_id:fields._id,name:fields.name,price:fields.price,img:files.file.name,techSpec:[]};
        //console.log(ob);
        MongoClient.connect(url,function(err,database){
            if(err) throw err;
            var db = database.db("Project");
            //var ob = request.body;
            //console.log(ob);
            db.collection("ItemList").insertOne(ob,function(err,result){
                if(err) throw err;    //handle it
                response.send(true);
                response.end();
                console.log("New Item Inserted");
           })
            database.close();
        });
    });
});



app.post("/updateTechSpec",function(request,response){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var ob = request.body;
        var myquery = { _id: ob._id };
        res.replaceOne({"_id":ob._id},{"_id":ob._id,"name":ob.name,"price":ob.price,"img":ob.img,"techSpec":ob.techSpec},function(err,res){
            if (err) throw err;
            response.send(true);
            response.end();
            console.log("TechSpec Updated(added)");
        });
        database.close();
    });
});
app.post("/DeleteProduct", function (request, response) {
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var obj = request.body;
        //console.log(obj);
        var del = {"_id":obj._id};
        //var set = require.body.item.pid;
        res.deleteOne(del,function (err, result) {
            if (err) throw err;
            response.send(true);
            //console.log(obj + "deleted product");
            response.end();
            console.log("An Item Deleted");
        });
        database.close();
    });
});
app.post("/DeleteProductList", function (request, response) {
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var obj = request.body;
        //console.log(obj);
        var del = {"techSpec.att":obj.att};
        //var set = require.body.item.pid;
        res.update({'_id':obj._id},{$pull:{techSpec:{att:obj.att}}},function (err, res) {
            if (err) throw err;
            //console.log(obj + "deleted product list");
            response.send(true);
            response.end();
            console.log("TechSpec updated (removed)");
        });
        database.close();
    });
});


//-------------------------------------WRT to productDesc page and search pid page---------------

app.post("/search",function(request,response){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var obj = request.body;
        //console.log(obj);
        res.find({_id:obj.pidToSearch}).toArray(function(err,result){
            if(err) throw err;
            if(result.length){
                response.send(true);
                console.log("Found by itemId in Collection");
            }
            else{
                response.send(false);
                console.log("Unable to find that item");
            }
            response.end();
        });
        database.close();
    });
});
app.post("/getData",function(request,response){
    response.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var ob = request.body;
        //console.log(ob);
        res.find({_id:ob.lastSearchedPid}).toArray(function(err,result){
            if(err) throw err;
            response.send(result);
            console.log("Searched item values transfered");
            response.end();
        });
        database.close();
    });
});

app.post("/registerComment",function(request,response){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("FeedbackCollection");
        var dataToInsert = request.body;
        if(dataToInsert._id==null){
            return;
        }
        //console.log(dataToInsert);
        res.insertOne(dataToInsert,function(err,result){
            if(err) throw err;
            response.send(true);
            response.end();
            console.log("feedback registered");
        });
        database.close();
    });
});

//------------------------- To run server -----------------------------

app.listen(3000,function(){
    console.log("server runnig....");
});