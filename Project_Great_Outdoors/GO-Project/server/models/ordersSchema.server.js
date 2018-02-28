var mongoose = require("mongoose");
/* Schema for order table */
var orderSchema = mongoose.Schema({
    _id:String,
    imageUrl:String,
    name:String,
    productId:Number,
    price:Number,
    quantity:Number,
    status:Number,
    customerId:String,
    address:String,
    date:String,
    gift:Number
},{collection:"Orders"});
mongoose.model("orders",orderSchema);