app.controller("logisticController", function ($scope, logisticService) {
    $scope.statusArray = ['Order Placed', "Item Packed", "Shipped", "Delivered", "Cancelled"];
    logisticService.fetchAllData(function (result) {
        $scope.orderList = result;
        //alert(JSON.stringify($scope.orderList));
        getCount();
    })
    var getCount = function () {
        $scope.totalOrder = $scope.orderList.length;
        $scope.totalDelivered = $scope.orderList.filter(e => e.status === 3).length;
        $scope.totalShipped = $scope.orderList.filter(e => e.status === 2).length;
        $scope.totalPacked = $scope.orderList.filter(e => e.status === 1).length;
        $scope.totalPlaced = $scope.orderList.filter(e => e.status === 0).length;
        $scope.totalCancelled = $scope.orderList.filter(e => e.status === 4).length;
    }
    $scope.changeStatus = function (orderId, status, object) {
        var ob = {
            idOfTheOrder: orderId,
            status: $scope.statusArray.indexOf(status)
        };
        var itemIndex = $scope.orderList.indexOf(object);
        var statusCode = $scope.statusArray.indexOf(status);
        logisticService.updateStatus(ob, function (result) {
            if (result == true) {
                $scope.orderList[itemIndex].status = statusCode;
                getCount();
            }
        })
    }
    $scope.selectedRadioButton = '';
    $scope.checkFunction = function () {
        alert("reaching");
        alert($scope.selectedRadioButton);
    }
});