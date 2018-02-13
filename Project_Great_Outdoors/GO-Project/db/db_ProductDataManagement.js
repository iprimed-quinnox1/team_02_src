var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.findItemById = function(queryObject,callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
       // console.log(JSON.stringify(queryObject));
        res.find(queryObject).toArray(function(err,result){
            if(err) throw err;
            callback(result[0]);
        });
        database.close();
    });
}
exports.ProductData = function(callback){
    console.log("mongo");
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        //console.log(ob);
        res.find().toArray(function(err,result){
            if(err) throw err;
            callback(result);
        });
        database.close();
    });
}