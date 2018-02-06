var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.findAddress = function (ob, callback) {
    // callback("nishant");
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var db = database.db("Project");
        var res = db.collection("AddressList");
        console.log(ob);
        res.find(ob).toArray(function (err, result) {
            if (err) {
                callback(err);
            }
            //console.log(result);
            callback(result);
        })
        database.close();
    });
}

exports.defaultAddress = function(ob,callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("AddressList");
        res.find({type:"D"}).toArray(function(err,result){
            if(err) throw err;
            callback(result);
        })
        database.close();
    });
}