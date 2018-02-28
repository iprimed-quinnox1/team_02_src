/* 
    This controller is related to the productMaster
    and deals with all the operations related to t-
    he database.
*/

var mongoose = require('mongoose');

var test = mongoose.model("productMaster");
var formidable = require("formidable");
var fs = require('fs');

/* To get the list of all the items */
exports.allItems = function(request,response){
    test.find(function(err,productList){
        if(err) throw err;
        response.send(productList);
        response.end();
        console.log("Whole data sent");
    });
}
/* To get the top 10 recent item list */
exports.getRecentItems = function(request,response){
    test.find().sort({$natural:-1}).limit(10).exec(function(err,result){
        if(err) throw err;
        response.send(result);
        response.end();
        console.log("Recent Items sent");
    });
}
/* To create a new product and push it in database */
exports.createNew = function(request,response){
    var form = new formidable.IncomingForm();
    form.parse(request,function(err,fields,files){
        if(files)
        //console.log(files);
        //console.log(fields);
        var oldPath = files.file.path;
        var newPath = __dirname+"/uploads/"+files.file.name;
        //console.log(newPath);
        fs.rename(oldPath,newPath,function(err){
            if(err) throw err;
        });
        var temp= new test({_id:fields._id,name:fields.name,price:fields.price,img:files.file.name,techSpec:[]});
        //console.log(ob);
        temp.save(function(err,result){
            if(err) throw err;
            response.send(true);
            response.end();
            console.log("New item inserted successfully");
        });
    });
}

/* To add technical specification to a particular product */
exports.updateTechSpec = function(request,response){
    var techSpecToAdd = request.body;
    /* techSpecToAdd._id contains the id to be updated */
    test.findByIdAndUpdate(techSpecToAdd._id,{$set:{techSpec:techSpecToAdd.techSpec}},{new:true},function(err,result){
        if(err) throw err;
        response.send(true);
        response.end();
        console.log("TechSpec Updated(added)");
    });
}

/* To delete a prduct */
exports.deleteProduct = function(request,response){
    var itemToDelete = request.body;
    test.remove({_id:itemToDelete._id},function(err,result){
        if(err) throw err;
        response.send(true);
        response.end();
        console.log("Item Deleted");
    });
}

/* To Delete technical specification of a product */
exports.deleteProductList = function(request,response){
    techSpecToDelete = request.body;
    console.log(techSpecToDelete);
    test.findByIdAndUpdate(techSpecToDelete._id,{$pull:{techSpec:{att:techSpecToDelete.att}}},function(err,result){
        if(err) throw err;
        response.send(true);
        response.end();
        console.log("TechSpec Updated(removed)")
    });
}
