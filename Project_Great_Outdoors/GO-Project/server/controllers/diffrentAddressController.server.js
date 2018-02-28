var mongoose = require('mongoose');
var addModel = mongoose.model("addressModel");


exports.findAddress=function(req,res){
    var ob=req.body.customerId;
    addModel.find({'customerId':ob},function(err,result){
        
if(err) throw err;
else{
 res.send(result);   
}
    });

}
exports.defaultAddress=function(req,res){
    var ob =req.body;
    addModel.find({$and:[ob,{type:"D"}]},function(err,result){
if(err) throw err;
else{
    res.send(result);
}
    });
}

/*
exports.findAddress = function (ob, callback) {
    // callback("nishant");
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var db = database.db("Project");
        var res = db.collection("AddressList");
        //console.log(ob);
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
        //console.log(ob);
        res.find({$and:[ob,{type:"D"}]}).toArray(function(err,result){
            if(err) throw err;
            callback(result);
            console.log("finding the default address from database");
        })
        database.close();
    });
}*/