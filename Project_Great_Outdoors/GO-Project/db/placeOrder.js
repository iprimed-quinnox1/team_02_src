var mongo=require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.placeOrderInsertion=function(ob,callback){
    mongo.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        db.collection("Orders").insertOne(ob,function(err,result){
            if(err) throw err;    //handle it
            console.log("New Item Inserted");
            callback(true);
       })
        database.close();
    });
}