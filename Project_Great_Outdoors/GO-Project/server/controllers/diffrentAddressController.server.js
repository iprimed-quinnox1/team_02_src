var mongoose = require('mongoose');
var addModel = mongoose.model("addressModel");


exports.findAddress=function(req,res){
    var ob=req.body.customerId;
    addModel.find({'customerId':ob},function(err,result){
        
if(err) throw err;
else{
 res.send(result);   
}
    });

}
exports.defaultAddress=function(req,res){
    var ob =req.body;
    addModel.find({$and:[ob,{type:"D"}]},function(err,result){
if(err) throw err;
else{
    res.send(result);
}
    });
}

