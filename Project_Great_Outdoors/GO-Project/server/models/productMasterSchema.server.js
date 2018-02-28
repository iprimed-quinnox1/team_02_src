var mongoose = require("mongoose");
//var Schema = mongoose.Schema;
/* 
    productMasterSchema defines the schema
    of the productMaster.
*/
var productMasterSchema = mongoose.Schema({
    _id:String,
    name:String,
    price:Number,
    img:String,
    techSpec:[]
},{collection:"ItemList"});
mongoose.model("productMaster",productMasterSchema);