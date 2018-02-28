var mongoose = require('mongoose');
var logisticData = mongoose.model("orders");/* orders is a schema defined in ordersSchema.server */

/* To get the details of every ordered products */
exports.getAllData = function(request,response){
    logisticData.find(function(err,ordersList){
        if(err) throw err;
        response.send(ordersList);
        response.end();
        console.log("orderDetails sent");
    });

}
/* To change the status of an ordered item in the database */
exports.updateStatus = function(request,response){
    var ob = request.body;
    logisticData.findByIdAndUpdate(ob.idOfTheOrder,{$set:{status:ob.status}},function(err,result){
        if(err) throw err;
        response.send(true);
        response.end();
        console.log("Status updated");
    });

}