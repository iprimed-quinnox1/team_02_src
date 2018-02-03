var express = require("express");
var app = express();



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/",express.static(__dirname+"/template"));
app.use("/",express.static(__dirname));


var placeOrder = require("./routes/order/placeOrder.js");
app.use("/order",placeOrder);

var address = require("./routes/address/getCustomerAddressById.js");
app.use("/address",address);

var addressForm = require("./routes/address/AddressFormRoute.js");

app.use("/addressF",addressForm);

app.listen(3000,function(){
    console.log("server started running.....");
});

