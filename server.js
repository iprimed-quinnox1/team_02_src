var express = require("express");
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
            console.log("sent");
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
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var ob = request.body;
        //console.log(ob);
        db.collection("ItemList").insertOne(ob,function(err,result){
            if(err) throw err;    //handle it
            response.send(true);
       })
        database.close();
    });
});


app.post("/updateTechSpec",function(request,response){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var ob = request.body;
        var myquery = { pid: ob.pid };
        res.replaceOne({"pid":ob.pid},{"pid":ob.pid,"techSpec":ob.techSpec},function(err,res){
            if (err) throw err;
            console.log("1 document updated");
            response.send(true);
        });
        database.close();
    });
});

//------------------------- To run server -----------------------------

app.listen(3000,function(){
    console.log("server runnig....");
});