/* This page will fetch the data from orders collection and send the result back to the router 
*/

var mongo=require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.orderDetailInitialization=function(ob,callback){
    mongo.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        db.collection("Orders").find({customerId:ob}).toArray(function(err,result){
            if(err) throw err;    //handle it
            console.log("Order Details sent");
            callback(result);
       })
        database.close();
    });
}
exports.orderDetailDeletion=function(ob,callback){
    mongo.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        db.collection("Orders").updateOne(ob,{$set:{status:4}},function(err,result){
if(err) throw err;
console.log("orderDetail Deleted");
callback(true);
        });
        database.close();
});
}