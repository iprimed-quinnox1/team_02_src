var express = require("express");

var mongo=require("mongodb").MongoClient;
var bodyparser=require("body-parser");
var url = "mongodb://localhost:27017/";
var app=express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use("/todo", express.static(__dirname));

app.get("/Initialization",function(req,res,next)
{
	res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    }); //to set the header 
	mongo.connect(url,function(err,dataB){
		if(err) throw err;
var dbs=dataB.db('todoList');
dbs.collection('list').find().toArray(function (err, result) {
	if (err) throw err;
	res.send(result);
console.log("sent");
res.end();
});
dataB.close();
	});

});
app.post("/Insert",function(req,res){
mongo.connect(url,function(err,dataB){
	if(err) throw err;
	var dbs=dataB.db('todoList');
	var obj=req.body;
	dbs.collection("list").insertOne(obj,function(err,result){
		if(err) throw err;
console.log(obj.names+"inserted");
	});
dataB.close();
});
});
app.post('/Delete',function(req,res){
mongo.connect(url,function(err,dataB){
	if(err) throw err;
var dbs=dataB.db("todoList");
var objs=req.body;
dbs.collection('list').deleteOne({names : objs.name} ,function(err,result){
if(err) throw err;
console.log(result);
console.log("deleted");
});
dataB.close();
});
});
app.listen(3001,function(){
	console.log("server has started at 3001");
});