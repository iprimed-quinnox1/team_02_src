app.service("placeOrder", function ($http) {
    this.placeOrders = function (ob) {
        //alert("reacing");
        var data = { toInsert: ob };
        //alert(JSON.stringify(data));
        $http.post(url + "order/placeOrder", data).then(
            function (result) {
                if (result.data==true) {
                    alert("Yout order is placed" + " " + "Thank you");
                } else {
                    alert("error");
                }


            }
        );
    }
});