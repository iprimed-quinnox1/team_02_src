var mongoose = require('mongoose');
var formidable = require("formidable");
var fs = require('fs');

exports.findUser = function(request,response){
    response.write("Hey I found u");
}