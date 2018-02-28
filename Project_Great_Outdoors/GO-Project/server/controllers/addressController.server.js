var mongoose = require('mongoose');
var addModel = mongoose.model("addressModel");

exports.AddressInitialization = function (req, res) {
    var ob = req.body;
    
    addModel.find(ob, function (err, result) {
        if (err) throw err;
        res.send(result);
    });
}

exports.AddressInsertion = function (req, res) {
    var ob = req.body;
    var data = new addModel({ customerId: ob.customerId, Name: ob.Name, PhoneNumber: ob.PhoneNumber, Address: ob.Address, City: ob.City, State: ob.State, ZIPcode: ob.ZIPcode, Country: ob.Country, type: ob.type })
    data.save(function (err, result) {
        if (err) throw err;
        res.send(true);
        console.log("inserted");
    });

}
exports.AddressDefaultSetdb = function (req, res) {
    var ob = req.body;
    console.log(ob);
    addModel.update({ customerId: ob.customerId }, { $set: { type: "T" } }, { multi: true }, function (err, result) {
        if (err) throw err;
        res.send(true);
        // console.log(result)

    });
}
exports.AddressDefaultdb = function (req, res) {
    var ob = req.body;
    console.log(ob);
    addModel.findOneAndUpdate({ Name: ob.Name }, { $set: { type: "D" } }, function (err, result) {
        if (err) throw err;
        res.send(true);
    });
}
exports.AddressDeletion=function(req,res){
   // console.log("aaya");
    var ob=req.body;
    //console.log(JSON.stringify(ob));
    addModel.findOneAndRemove({Name:ob.name},function(err,result){
if(err) throw err;
res.send(true);
    });
}
