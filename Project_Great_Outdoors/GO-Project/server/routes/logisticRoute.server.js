
/* 
    Importing the controller
*/
var master = require("../controllers/logisticPageController.server");

/* exporting the set of routes combined in a module  */
module.exports = function(app){
    app.route("/logistic/getAllData").get(master.getAllData);
    app.route("/logistic/updateStatus").post(master.updateStatus);
}

/*
    logisticRouter.js take care of every valid route redirected using /route/

*/
