app.controller("orderPageCntr", function ($scope, $rootScope, orderDetailService, addressForm) {

    //alert("hello");
    var ob = { customerId: $rootScope.logedInUserId };
    orderDetailService.orderDetailsInitialization(ob, function (callback) {
        $rootScope.orderDetail = callback;
        console.log($rootScope.orderDetail);
    });

    $scope.orderDetailCancelOrder = function (index) {

        var ob = { _id: $rootScope.orderDetail[index]._id };
        orderDetailService.orderDetailsDeletion(ob, function (callback) {
            if (callback) {
                alert("Order Item Cancelled");
                var ob = { customerId: $rootScope.logedInUserId };
                orderDetailService.orderDetailsInitialization(ob, function (callback) {
                    $rootScope.orderDetail = callback;
                });
            }
            else {
                alert("error");
            }
        });
    };

    $scope.orderDetailAddressChange = function (idx) {

        var userIdob = { customerId: $rootScope.logedInUserId };
        addressForm.addressFormListInitialization(userIdob, function (result) {

            $scope.AddressArray = result;
        });
        $scope.ind = idx;
    };
    $scope.orderAddressDelivery = function (index) {
        //alert(index);
        var add = $scope.AddressArray[index].Name + " " + $scope.AddressArray[index].PhoneNumber + " " + $scope.AddressArray[index].Address + " " + $scope.AddressArray[index].City + " " + $scope.AddressArray[index].State;
        var ob = { _id: $rootScope.orderDetail[$scope.ind]._id, Address: add };
        // alert(JSON.stringify(ob));
        orderDetailService.orderAddressChange(ob, function (callback) {
            if (callback) {
                alert("Your Delivery address is changed");
                var ob = { customerId: $rootScope.logedInUserId };
                orderDetailService.orderDetailsInitialization(ob, function (callback) {
                    $rootScope.orderDetail = callback;
                });
            }
            else {
                alert("error");
            }
        });
    };
});