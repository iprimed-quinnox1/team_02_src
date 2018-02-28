var mongoose = require("mongoose");

var feedbackSchema = mongoose.Schema({
    userName:String,
    comment:String,
    idOfProduct:Number,
    date:String
},{collection:"FeedbackCollection"});
mongoose.model("feedback",feedbackSchema);