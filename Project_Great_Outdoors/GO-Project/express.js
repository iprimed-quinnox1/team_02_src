var express = require("express");
var app = express();
var mongoose = require("mongoose");


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/",express.static(__dirname+"/client/views/"));
app.use("/",express.static(__dirname));
app.use("/",express.static(__dirname+"/server/routes/uploads"));


mongoose.connect('mongodb://localhost:27017/Project');
//to load all the files to load a file in express we use require
/*fs.readdirSync(__dirname+"/server/models").forEach(function(filename){
    if(~filename.indexOf('.js')) //checking whether filename contains .js or not
        require(__dirname+'/server/models/'+filename); //adding those files here.
});*/

require("./server/models/productMasterSchema.server");
require("./server/models/ordersSchema.server");
require("./server/models/feedbackSchema.server");
require("./server/models/addressSchema.server");
require("./server/routes/addressFormRoute.server")(app);
require("./server/routes/getCustomerAddressByIdRoute.server")(app);
require("./server/routes/orderDetailsRoute.server")(app);
require("./server/routes/placeOrderRoute.server")(app);
require("./server/routes/productDataManagementRoute.server")(app);
require("./server/routes/logisticRoute.server")(app);
require("./server/routes/productDescriptionRoute.server")(app);
require("./server/routes/productMasterRoute.server")(app);
/*var placeOrder = require("./server/routes/order_placeOrder.js");
app.use("/order",placeOrder);

var address = require("./server/routes/address_getCustomerAddressById.js");
app.use("/address",address);

var addressForm = require("./server/routes/address_addressFormRoute.js");
app.use("/addressF",addressForm);

var productMaster = require("./server/routes/productMaster_productMasterRouters.js");
app.use("/productMaster",productMaster);

var productDescription = require("./server/routes/productMaster_productDescriptionRoute.js");
app.use("/productDescription",productDescription);


var productDataManagement = require("./server/routes/order_productDataManagement.js");
app.use("/productData",productDataManagement);

var orderDetail = require("./server/routes/order_orderDetails.js");
app.use("/orderDetail",orderDetail);

var logisticRouteHandler = require("./server/routes/productMaster_logisticRouter.js");
app.use("/logistic",logisticRouteHandler);*/




app.listen(3000,function(){
    console.log("server started running.....3000");
});

