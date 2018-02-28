var mongoose = require("mongoose");
var orderModel = mongoose.model("orders");

exports.orderInitialization = function(request,response){
    var ob= request.body.customerId;
    orderModel.find({customerId:ob},function(err,result){
        if(err) throw err;
        response.send(result);
        response.end();
        console.log("order details sent");
    });
}
exports.orderDeletion = function(request,response){
    var ob=request.body;
    orderModel.findByIdAndUpdate(ob._id,{$set:{status:4}},function(err,result){
        if(err) throw err;
        response.send(true);
        console.log("order deleted");
    });
}

exports.orderAddresschanges = function(request,response){
    var ob=request.body;
    orderModel.findByIdAndUpdate(ob._id,{$set:{address:ob.Address}},function(err,result){
        if(err) throw err;
        response.send(true);
        console.log("address updated");
    });
}