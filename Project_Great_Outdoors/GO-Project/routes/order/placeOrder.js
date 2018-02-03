var express = require('express');
var router = express.Router();

router.get('/placeOrder', function(req, res){
    res.set({
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials":true
    });
   res.send('HEllo');
});


//export this router to use in our index.js
module.exports = router;
