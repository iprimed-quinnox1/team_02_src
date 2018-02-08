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

var productMaster = require("./routes/productMaster/productMasterRouters");
app.use("/productMaster",productMaster);

var productDescription = require("./routes/productDescriptionRoute.js");
app.use("/productDescription",productDescription);


var productDataManagement = require("./routes/order/ProductDataManagement.js");
app.use("/productData",productDataManagement);

var orderDetail = require("./routes/order/order_orderDetails.js");
app.use("/orderDetail",orderDetail);

var logisticRouteHandler = require("./routes/logisticRouter");
app.use("/logistic",logisticRouteHandler);


app.listen(3000,function(){
    console.log("server started running.....");
});

