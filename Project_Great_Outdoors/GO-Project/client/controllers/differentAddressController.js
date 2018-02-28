app.controller("diffAddCntr", function ($scope, $location, $rootScope, fetchSingleUserAddress, placeOrder) {
    var object = {
        customerId: $rootScope.logedInUserId
    };

    fetchSingleUserAddress.fetchUserAddress(object, function (result) {
        var add = [];
       
        for (var i = 0; i < result.length; i++) {
            var addressString = JSON.stringify(result[i]);
            add.push(addressString);
        }
        $scope.address = add;
        //alert($scope.address);
    });

    //alert(JSON.stringify($rootScope.Cartob));

    $scope.removeItemFromCart = function (ob) {

        var index = $rootScope.Cartob.indexOf(ob);
        $rootScope.Cartob.splice(index, 1);
    }
    $scope.placeOrder = function () {

        //alert(JSON.stringify($rootScope.Cartob));
        for (var i = 0; i < $rootScope.Cartob.length; i++) {
            $rootScope.Cartob[i].orderId = $rootScope.Cartob[i]._id + "" + $rootScope.logedInUserId + "" + new Date();
            $rootScope.Cartob[i].status = 0;
            $rootScope.Cartob[i].customerId = $rootScope.logedInUserId;
            $rootScope.Cartob[i].Date = new Date().toDateString();


        }
        //alert(JSON.stringify($rootScope.Cartob));
        //console.log($rootScope.Cartob);
        placeOrder.placeOrders($rootScope.Cartob);
        $rootScope.Cartob = [];
        $location.path("/homePage");

        //console.log($scope.address);
    }

});
