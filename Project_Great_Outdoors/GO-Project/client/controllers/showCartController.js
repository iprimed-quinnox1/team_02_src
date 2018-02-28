app.controller("myCntr", function ($scope, $rootScope) {
    //alert(JSON.stringify($rootScope.Cartob));
    //console.log($rootScope.Cartob); 
    $scope.selectedName = 1;
    $scope.quantityRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.removeItemFromCart = function (ob) {
        var index = $rootScope.Cartob.indexOf(ob);
        $rootScope.Cartob.splice(index, 1);
    }
    $scope.calculateTotal = function () {
        var sum = 0;
        for (var i = 0; i < $rootScope.Cartob.length; i++) {
            sum += $rootScope.Cartob[i].quantity * $rootScope.Cartob[i].price;
        }
        $scope.totalSum = sum;
    }();
    $scope.showCartOb = function () {
        console.log($rootScope.Cartob);
    }
    $scope.giftButton = function (index) {
        $rootScope.Cartob[index].gift = 1;
        //alert("This item will be packed in gift")



    };
});
