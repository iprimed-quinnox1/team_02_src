var app = angular.module("myApp", ["ngRoute"]).config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "./template/customerLogin.html",
            controller: "loginController"
        })
        .when("/add", {
            templateUrl: "./template/address.html",
            controller: "mycont"
        })
        .when("/goToCart", {
            templateUrl: "./template/showCart.html",
            controller: "myCntr"
        })
        .when("/diffAdd", {
            templateUrl: "./template/differentAddress.html",
            controller: "diffAddCntr"
        })
});


app.controller("loginController", function ($scope, $rootScope) {
    $scope.login = function () {
        $rootScope.logedInUserId = $scope.customerId;
        /*var ob = {customerId:$rootScope.logedInUserId};
        defaultAddress.getDefaultAddress(ob,function(result){
            $rootScope.defaultAddress = result[0].city+" "+result[0].country+" "+result[0].street;
         });*/
        window.location.href = "#!goToCart";
    }
});

app.controller("myCntr", function ($scope, $rootScope, defaultAddress) {
    //provide me the list of addresses assoiciated to a particular user.
    //Create a cart object wrt user logged in to display in cart.
    //alert($rootScope.logedInUserId);
    /*var ob = {customerId:$rootScope.logedInUserId};
    defaultAddress.getDefaultAddress(ob,function(result){
       $rootScope.defaultAddress = result[0].city+" "+result[0].country+" "+result[0].street;
        alert($rootScope.defaultAddress);
    });*/
    //alert($rootScope.defaultAddress);
    $rootScope.cartOb = [{
            imageUrl: "./images/secondImage.jpg",
            name: "Sony MDR-XB450 On-Ear EXTRA BASS Headphones (Blue) by Sony",
            productId: 'P101',
            price: 400,
            quantity: 1
        },
        {
            imageUrl: "./images/fourthImage.jpg",
            name: "Sony MDR-XB450 On-Ear EXTRA BASS Headphones (Blue) by Sony",
            productId: 'P102',
            price: 100,
            quantity: 1
        }
    ];
    $scope.selectedName = 1;
    $scope.quantityRange = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    $scope.removeItemFromCart = function (ob) {

        //need to update dtabase also
        var index = $rootScope.cartOb.indexOf(ob);
        $rootScope.cartOb.splice(index, 1);
    }
    $scope.calculateTotal = function () {
        var sum = 0;
        for (var i = 0; i < $rootScope.cartOb.length; i++) {
            sum += $rootScope.cartOb[i].quantity * $rootScope.cartOb[i].price;
        }
        $scope.totalSum = sum;
    }();
    $scope.showCartOb = function () {
        console.log($rootScope.cartOb);
    }
});

/*app.controller("mycont", function ($scope,$rootScope,defaultAddress) {
    var ob = {customerId:$rootScope.logedInUserId};
    defaultAddress.getDefaultAddress(ob,function(result){
       $rootScope.defaultAddress = result[0].city+" "+result[0].country+" "+result[0].street;
       $scope.currentDeliveryAddress = $rootScope.defaultAddress;
       // alert($rootScope.defaultAddress);
    });
    $scope.AddressArray = [];
    $scope.AddressSave = function () {
        var add = {
            Name: $scope.CustomerName,
            PhoneNumber: $scope.CustomerNumber,
            Address1: $scope.CustomerAddress1,
            Address2: $scope.CustomerAddress2,
            City: $scope.CustomerCity,
            State: $scope.CustomerState,
            Postcode: $scope.CustomerPostcode,
            Country: $scope.CustomerCountry
        };
        $scope.AddressArray.push(add);
        $scope.FormData = false;fetchSingleUserAddress
    }
    $scope.DefaultAddress = function (index) {
        //  alert("running");
        $scope.AddressObject = {
            Name: $scope.AddressArray[index].Name,
            Number: $scope.AddressArray[index].PhoneNumber,
            Address1: $scope.AddressArray[index].Address1,
            Address2: $scope.AddressArray[index].Address2,
            City: $scope.AddressArray[index].City,
            State: $scope.AddressArray[index].City,
            Postcode: $scope.AddressArray[index].Postcode,
            Country: $scope.AddressArray[index].Country
        }
        //alert(JSON.stringify($scope.AddressObject));
    }
});*/
var cont = app.controller("mycont", function ($scope,$rootScope,addressForm,defaultAddress) {

    
    addressForm.addressFormListInitialization(function (result) {

        $scope.AddressArray = result;

    });
   

    $scope.AddressSave = function () {

        var add = {
            Name: $scope.CustomerName,
            PhoneNumber: $scope.CustomerNumber,
            Address: $scope.CustomerAddress1,
            City: $scope.CustomerCity,
            State: $scope.CustomerState,
            ZIPcode: $scope.CustomerPostcode,
            Country: $scope.CustomerCountry,
            Type: "T"
        };

        addressForm.addressFormListUpdate(add).then(function (result) {
            if (result) {
                alert("inserted");
            } else {
                console.log("Failed to get Client Data");
            }

        });
        addressForm.addressFormListInitialization(function (result) {

            $scope.AddressArray = result;

        });
        $scope.FormData = false;
    }
    $scope.DefaultAddress = function (index) {
        $scope.currentDeliveryAddress = $scope.AddressArray[index].Name;
       /*$scope.AddressObject = {
            Name: $scope.currentDeliveryAddress[index].Name,
            Number: $scope.currentDeliveryAddress[index].PhoneNumber,
            Address1: $scope.currentDeliveryAddress[index].Address,
            City: $scope.currentDeliveryAddress[index].City,
            State: $scope.currentDeliveryAddress[index].City,
            Postcode: $scope.currentDeliveryAddress[index].ZIPcode,
            Country: $scope.currentDeliveryAddress[index].Country
        }*/

    }
    var ob = {customerId:$rootScope.logedInUserId};
    defaultAddress.getDefaultAddress(ob,function(result){
       $rootScope.defaultAddress = result[0].city+" "+result[0].country+" "+result[0].street;
       $scope.currentDeliveryAddress = $rootScope.defaultAddress;
       // alert($rootScope.defaultAddress);
    });
});
app.controller("diffAddCntr", function ($scope, $rootScope, fetchSingleUserAddress) {
    var object = {
        customerId: $rootScope.logedInUserId
    };

    fetchSingleUserAddress.fetchUserAddress(object, function (result) {
        var add = [];
        for (var i = 0; i < result.length; i++) {
            var addressString = result[i].city + " " + result[i].country + " " + result[i].street;
            add.push(addressString);
        }
        $scope.address = add;
    });
    for (var i = 0; i < $rootScope.cartOb.length; i++) {
        $rootScope.cartOb[i].address = $rootScope.defaultAddress;
    }
    //alert(JSON.stringify($rootScope.cartOb));

    $scope.removeItemFromCart = function (ob) {

        var index = $rootScope.cartOb.indexOf(ob);
        $rootScope.cartOb.splice(index, 1);
    }
    $scope.placeOrder = function () {
        console.log($rootScope.cartOb);
        /*for(var i=0 ;i<$rootScope.cartOb.length;i++){
            $rootScope.cartOb[i].orderId = $rootScope.cartOb[i].productId+""+$rootScope.logedInUserId+""
        }*/
        //console.log($rootScope.cartOb);
        //console.log($scope.address);
    }
});