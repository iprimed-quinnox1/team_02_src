var mongo=require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.AddressInitialization=function(callback){
    
    mongo.connect(url, function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("AddressList");
        res.find().toArray(function(err,result){
            if(err) throw err;
            console.log(result);
            console.log("whole data sent");
            callback(result);

        });
        database.close();
    });
}
exports.AddressInsertion=function(ob,callback){
    mongo.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        db.collection("AddressList").insertOne(ob,function(err,result){
            if(err) throw err;    //handle it
          
            console.log("New Item Inserted");
       })
        database.close();
    });
}