var mongoose = require("mongoose");
var item = mongoose.model("productMaster");
var feedback = mongoose.model("feedback");

/*  
    getData function find the item from the productMaster 
    using the ID and return the detail about that item as 
    a response.
*/
exports.getData = function(request, response){
    var ob= request.body.lastSearchedPid;    
    item.find({'_id':ob},function(err,result){
        if(err) throw err;
       // console.log(result);
        response.send(result[0]);
        response.end();
        console.log("searched item details sent");
    });
}

/* 
    Returns all the product that  will be mapped on the 
    home page of the website for client to select from.
*/

exports.getProductData = function(request,response){
    item.find(function(err,productList){
        if(err) throw err;
        response.send(productList);
        response.end();
        console.log("list of product sent");
    });
}

/* 
    To register the feedbacks in the feedback collection.
    the data in request.body is { userName: 'nishant', comment: 'dsfdfs', idOfProduct: 102 }

*/
exports.registerComment = function(request,response){
    var temp = new feedback(request.body);
    temp.save(function(err,success){
        if(err) throw err;
        response.send(true);
        response.end();
        console.log("feedback registered successfully");
    });
}
exports.feedBackData = function(request,response){
    var value = request.body.userid;
    feedback.find({idOfProduct:value},function(err,result){
        if(err) throw err;
        response.send(result);
        console.log("Reviews are sent for pid"+value);
    });
}