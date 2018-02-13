var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.findItemById = function(queryObject,callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        //console.log(ob);
        res.find(queryObject).toArray(function(err,result){
            if(err) throw err;
            callback(result[0]);
        });
        database.close();
    });
}

exports.registerComment = function(commentToRegister,callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("FeedbackCollection");
        //console.log(commentToRegister +"In Database");
        if(commentToRegister.idOfProduct==null){
            return;
        }
        res.insertOne(commentToRegister,function(err,result){
            if(err) throw err;
            callback(true);
        });
        database.close();
    });
}