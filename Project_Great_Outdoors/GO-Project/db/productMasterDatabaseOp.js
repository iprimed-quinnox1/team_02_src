var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/";

exports.getAllProductList = function(callback){
    MongoClient.connect(url, function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        res.find().toArray(function(err,result){
            if(err) throw err;
            callback(result);
        });
        database.close();
    });
}

exports.insertNewItem= function(ob,callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        //var ob = request.body;
        //console.log(ob);
        db.collection("ItemList").insertOne(ob,function(err,result){
            if(err) throw err;    //handle it
            callback(true);
       })
        database.close();
    });
}

exports.addTechSpec = function(techSpecToAdd ,callback){
    MongoClient.connect(url,function(err,database){
        if(err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var ob = techSpecToAdd;
        var myquery = { _id: ob._id };
        res.replaceOne({"_id":ob._id},{"_id":ob._id,"name":ob.name,"price":ob.price,"img":ob.img,"techSpec":ob.techSpec},function(err,res){
            if (err) throw err;
            callback(true); 
        });
        database.close();
    });
}

exports.deleteItem = function(itemToDelete,callback){
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var obj = itemToDelete;
        //console.log(obj);
        var del = {"_id":obj._id};
        //var set = require.body.item.pid;
        res.deleteOne(del,function (err, result) {
            if (err) throw err;
            callback(true);
            //console.log(obj + "deleted product");
            
        });
        database.close();
    });
}

exports.deleteTechSpec = function(techSpecToDelete,callback){
    MongoClient.connect(url, function (err, database) {
        if (err) throw err;
        var db = database.db("Project");
        var res = db.collection("ItemList");
        var obj = techSpecToDelete;
        //console.log(obj);
        var del = {"techSpec.att":obj.att};
        //var set = require.body.item.pid;
        res.update({'_id':obj._id},{$pull:{techSpec:{att:obj.att}}},function (err, res) {
            if (err) throw err;
            //console.log(obj + "deleted product list");
            callback(true);
            
        });
        database.close();
    });
}