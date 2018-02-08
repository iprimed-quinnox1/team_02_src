var mongo=require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";


exports.getAllData = function(cbk){
    mongo.connect(url, function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("Orders");
        res.find().toArray(function(err,result){
            cbk(result);
        });
        database.close();
    });
}

exports.updateStatus = function(ob,callback){
    console.log(JSON.stringify(ob));
    mongo.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("Orders");
        res.updateOne({_id:ob.idOfTheOrder},{$set:{status:ob.status}},function(err,result){
            if(err) throw err;
            callback(true);
        });
    });
}