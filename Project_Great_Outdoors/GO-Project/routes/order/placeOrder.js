var express = require('express');
var router = express.Router();
var mon = require("../../db/placeOrder.js");

router.post('/placeOrder', function (req, res) {
    console.log("aa gaya be");
    //console.log(req.body.toInsert)
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true
    });
    var count = 0;
    var getData = req.body.toInsert;
    for (var i = 0; i < getData.length; i++) {
        var data = { "_id": getData[i]._id, 
                        "imageUrl": getData[i].imageUrl,
                         "name": getData[i].name, 
                         "productId": getData[i].productId, 
                         "price": getData[i].price, 
                         "quantity": getData[i].quantity, 
                         "status": getData[i].status, 
                         "customerId": getData[i].customerId };
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