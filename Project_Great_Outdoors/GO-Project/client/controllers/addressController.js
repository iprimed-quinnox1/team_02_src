var cont = app.controller("mycont", function ($scope,$route, $location,$rootScope, addressForm, defaultAddress, placeOrder) {

    var userIdob = { customerId: $rootScope.logedInUserId };
    addressForm.addressFormListInitialization(userIdob, function (result) {

        $scope.AddressArray = result;

    });


    $scope.AddressSave = function () {

        var add = {
            customerId: $rootScope.logedInUserId,
            Name: $scope.CustomerName,
            PhoneNumber: $scope.CustomerNumber,
            Address: $scope.CustomerAddress1,
            City: $scope.CustomerCity,
            State: $scope.CustomerState,
            ZIPcode: $scope.CustomerPostcode,
            Country: $scope.CustomerCountry,
            type: "T"

        };

        addressForm.addressFormListUpdate(add, function (res) {
            if (res) {
                alert("inserted");
                addressForm.addressFormListInitialization(userIdob, function (result) {

                    $scope.AddressArray = result;
                });
            } else {
                alert("error occured")
            }
        });
        /*addressForm.addressFormListInitialization(userIdob,function (result) {

            $scope.AddressArray = result;

        });*/
        $scope.FormData = false;
    }
    $scope.DefaultAddress = function (index) {

        $scope.AddressObjectDefault = {
            Name: $scope.AddressArray[index].Name,
            PhoneNumber: $scope.AddressArray[index].PhoneNumber,
            Address: $scope.AddressArray[index].Address,
            City: $scope.AddressArray[index].City,
            State: $scope.AddressArray[index].State,
            ZIPcode: $scope.AddressArray[index].ZIPcode,
            Country: $scope.AddressArray[index].Country
        }


    }
    $scope.setDefaultAddress = function (obj) {
        var index = $scope.AddressArray.indexOf(obj);

        var data = { customerId: $rootScope.logedInUserId }
        addressForm.addressDefaultSet(data, function (callback) {
            if (callback) {
                //alert("aagaya");
                var def = { Name: $scope.AddressArray[index].Name };
                addressForm.addressDefault(def, function (callback) {
                    if (callback) {
                        alert("Changed default addressDefault");
                        $scope.DefaultAddress(index);
                        var userIdob = { customerId: $rootScope.logedInUserId };
                        addressForm.addressFormListInitialization(userIdob, function (result) {

                            $scope.AddressArray = result;

                        });
                    }
                    else {
                        alert("error in setting default address");
                    }

                });
            }
            else {
                alert("didnt set address");
            }

        });

    }
    $scope.DeleteAddress = function (obj) {
        var index = $scope.AddressArray.indexOf(obj);

        var del = $scope.AddressArray[index].Name;
        addressForm.addressFormListDelete(del);

        addressForm.addressFormListInitialization(userIdob, function (result) {

            $scope.AddressArray = result;

        });

    }
    var ob = {
        customerId: $rootScope.logedInUserId
    };
    defaultAddress.getDefaultAddress(ob, function (result) {
        //alert(JSON.stringify(result)+" fetched by default address");
        $rootScope.defaultAddress = result[0].Name + " " + result[0].PhoneNumber + " " + result[0].Address + " " + result[0].City + " " + result[0].State;
        $scope.AddressObjectDefault = result[0];
        for (var i = 0; i < $rootScope.Cartob.length; i++) {
            $rootScope.Cartob[i].address = $rootScope.defaultAddress;
        }
        // alert($rootScope.defaultAddress);
    });
    //Written by @nke
    $scope.placeOrder = function () {
        // alert("reaching");
        //alert(JSON.stringify($scope.AddressObjectDefault));
        //alert(JSON.stringify($scope.AddressArray));
        //alert(JSON.stringify($rootScope.Cartob));
        //alert(JSON.stringify($rootScope.Cartob));
        // alert(JSON.stringify($scope.AddressObjectDefault));
        for (var i = 0; i < $rootScope.Cartob.length; i++) {
            $rootScope.Cartob[i].address = $scope.AddressObjectDefault.Name + " " + $scope.AddressObjectDefault.PhoneNumber + " " + $scope.AddressObjectDefault.Address + " " + $scope.AddressObjectDefault.City + " " + $scope.AddressObjectDefault.State;//JSON.stringify($scope.AddressObjectDefault);
            $rootScope.Cartob[i].orderId = $rootScope.Cartob[i]._id + "" + $rootScope.logedInUserId + "" + new Date();
            $rootScope.Cartob[i].status = 0;
            $rootScope.Cartob[i].customerId = $rootScope.logedInUserId;
            $rootScope.Cartob[i].Date = new Date().toDateString();
        }
        //alert(JSON.stringify($rootScope.Cartob));
        placeOrder.placeOrders($rootScope.Cartob);
        $rootScope.Cartob = [];
        $location.path("/homePage");
        $route.reload();
    }


});