var express = require('express');
var router = express.Router();
var mon = require("../../db/db_placeOrder.js");

router.post('/placeOrder', function (req, res) {
    
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var count = 0;
    var getData = req.body.toInsert;
    for (var i = 0; i < getData.length; i++) {
        var data = { "_id": getData[i].orderId, 
                        "imageUrl": getData[i].img,
                         "name": getData[i].name, 
                         "productId": getData[i]._id, 
                         "price": getData[i].price, 
                         "quantity": getData[i].quantity, 
                         "status": getData[i].status, 
                         "customerId": getData[i].customerId,
                        "address": getData[i].address,
                        "date":getData[i].Date,
                    "gift":getData[i].gift };
        mon.placeOrderInsertion(data, function (result) {
            if (result) {
                count++;
            }
        })
    }
    if (count == getData.length) {
        res.send(true);
    }
    res.end();
});


//export this router to use in our index.js
module.exports = router;