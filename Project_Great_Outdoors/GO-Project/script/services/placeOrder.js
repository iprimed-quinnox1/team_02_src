app.service("placeOrder",function($http){
    this.placeOrders = function(ob){
        //alert("reacing");
        var data = {toInsert:ob};
        //alert(JSON.stringify(data));
        $http.post("http://localhost:3000/order/placeOrder",data).then(
            function(result){
                alert("Yout order is placed"+ " "+ "Thank you");
            },
            function(error){
                alert("error");
            }
        );
    }
});