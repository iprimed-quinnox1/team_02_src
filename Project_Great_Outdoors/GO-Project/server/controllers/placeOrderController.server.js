var mongoose = require("mongoose");
var orderModel = mongoose.model("orders");

exports.placeOrder = function (request, response) {
    var count = 0;
    var getData = request.body.toInsert;
    for (var i = 0; i < getData.length; i++) {
        var data = {
            "_id": getData[i].orderId,
            "imageUrl": getData[i].img,
            "name": getData[i].name,
            "productId": getData[i]._id,
            "price": getData[i].price,
            "quantity": getData[i].quantity,
            "status": getData[i].status,
            "customerId": getData[i].customerId,
            "address": getData[i].address,
            "date": getData[i].Date,
            "gift": getData[i].gift
        };
        var temp = new orderModel(data);
        count++;
        //console.log(count+"count ka data before ")
        temp.save(function (err, result) {
            
            if(err) throw err;
            
        });
    }
    //console.log(count);
    //console.log(getData.length);
    if (count == getData.length) {
        
        response.send(true);
        response.end();
    }
}