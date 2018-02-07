var mongo=require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.AddressInitialization=function(ob,callback){
    
    mongo.connect(url, function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("AddressList");
        res.find(ob).toArray(function(err,result){
            if(err) throw err;
            console.log("----------inside Database--------------");
            console.log(result);
            console.log("----------end Database--------------");
            //console.log("whole data sent");
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
            callback(true);
       })
        database.close();
    });
}
exports.AddressDeletion=function(ob,callback){
    mongo.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
     // console.log(JSON.stringify(ob)+ "db ka data");
        db.collection("AddressList").deleteOne(ob,function(err,result){
            if(err) throw err;    //handle it
            console.log("Selected addresss deleted");
            callback(true);
       })
        database.close();
    });
}