var mongoose=require("mongoose");
var addressSchema= mongoose.Schema({
customerId: String,
Name: String,
PhoneNumber:Number,
Address:String,
City:String,
State:String,
ZIPcode:Number,
Country:String,
type:String
},{collection:"AddressList"});
mongoose.model("addressModel",addressSchema);