
app.controller("addressPagecontroller", function ($scope, $rootScope, addressForm) {

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
            alert("inserted");
            addressForm.addressFormListInitialization(userIdob, function (result) {

                $scope.AddressArray = result;
            });
        });
        /*addressForm.addressFormListInitialization(userIdob,function (result) {

            $scope.AddressArray = result;

        });*/
        $scope.FormData = false;
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
});