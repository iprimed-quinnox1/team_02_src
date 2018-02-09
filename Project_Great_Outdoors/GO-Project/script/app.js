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
        .when("/productMaster", {
            templateUrl: "./template/productMaster.html",
            controller: "productMasterCntr"
        })
        .when("/homePage", {
            templateUrl: "./template/homePage.html",
            controller: "homePageCntr"
        })
        .when("/orderdetailpage",{
            templateUrl:"./template/template_orderDetails.html",
            controller:"orderPageCntr"
        })
        .when("/logesticPage",{
            templateUrl:"./template/logisticPage.html",
            controller:"logisticController"
        })
        /*.when("/desc",{
         templateUrl:"./template/productDescription.html",
         controller:"productDescCntr"
        })*/
});

/*
This is the controller to handle the operation related to the 
view of logistic module .
Basic operation includes:
    fetching all the orders from the database and displaying it on the view.
    Changing the status of the page.
    Filtering the product based on their order status.
*/
app.controller("logisticController",function($scope,logisticService){
    $scope.statusArray=['Order Placed',"Item Packed","Shipped","Delivered","Cancelled"];
    logisticService.fetchAllData(function(result){
        $scope.orderList = result;
        //alert(JSON.stringify($scope.orderList));
        getCount();
    })
    var getCount = function(){
        $scope.totalOrder = $scope.orderList.length;
        $scope.totalDelivered = $scope.orderList.filter(e=>e.status===3).length;
        $scope.totalShipped = $scope.orderList.filter(e=>e.status===2).length;
        $scope.totalPacked = $scope.orderList.filter(e=>e.status===1).length;
        $scope.totalPlaced = $scope.orderList.filter(e=>e.status===0).length;
        $scope.totalCancelled = $scope.orderList.filter(e=>e.status===4).length;
    }
    $scope.changeStatus = function(orderId,status,object){
        var ob ={
            idOfTheOrder:orderId,
            status:$scope.statusArray.indexOf(status)
        };
        var itemIndex = $scope.orderList.indexOf(object);
        var statusCode = $scope.statusArray.indexOf(status);
        logisticService.updateStatus(ob,function(result){
            if(result==true){
                $scope.orderList[itemIndex].status=statusCode;
                getCount();
            }
        })
    }
    $scope.selectedRadioButton ='';
    $scope.checkFunction = function(){
        alert("reaching");
        alert($scope.selectedRadioButton);
    }
});


//Controller for product Description page
app.controller("productDescCntr", function ($scope, $location, $parse, productDescriptionService) {
    var pidToSearch = $location.search()._id;
    var myOb = {
        lastSearchedPid: pidToSearch
    };

    productDescriptionService.searchForItem(myOb, function (result) {
        $scope.dataToMap = result;
    });
    /*$http.post("http://192.168.10.32:3000/getData", myOb).then(function (response) {
        $scope.dataToMap = response.data[0];
    });*/
    /*$scope.submitComment = function () {
        var name = document.getElementById("id_name").value;
        var comment = document.getElementById("id_comment").value;
        if (name == null || comment == null) {
            alert("enter properly");
            return;
        }
        var myOb = {
            userName: name,
            comment: comment,
            _id: $scope.dataToMap._id
        };
        $http.post("http://192.168.10.32:3000/registerComment", myOb).then(function (response) {
            if (response.data == true) {
                alert("Your feedback registered successfuly");
            }
        });
    }*/
});


//Controller for home page
app.controller("homePageCntr", function ($scope, $rootScope,productMasterService, productDescriptionService, productDataInitialization) {
    //$scope.MyItems=JSON.parse(localStorage.ItemList);
    $scope.productList = true;
    $scope.pan1 = true, $scope.pan2 = false, $scope.pan3 = false;
    productMasterService.initItemList(function (result) {
        $scope.MyItems = result;
        console.log($scope.MyItems);
    });
    /*$scope.searchItem = function(idOfItemClicked){
        window.location.href = "#!desc?_id="+idOfItemClicked;
    }*/

    /*$scope.AddToCart = function () {
      
        productDataInitialization.GetItem(function (result) {
            $rootScope.Data = result;
           
        });*/

    $scope.goToCart = function(){
       // alert("reached");
        window.location.href = "#!goToCart";
    }
    
    $scope.AddToCart = function () {
        var myOb = {
            datas: $scope.selectedId
        };


        productDataInitialization.searchForItem(myOb, function (result) {
            result.quantity=1;
            $rootScope.Cartob.push(result);
            alert("Added To Cart");
            //alert(JSON.stringify($rootScope.Cartob) + "cart ka data ");
        });

    }

    $scope.searchItem = function (idOfItemClicked) {
        $scope.selectedId = idOfItemClicked;
        var myOb = {
            lastSearchedPid: idOfItemClicked
        };
        productDescriptionService.searchForItem(myOb, function (result) {
            $scope.dataToMap = result;
            //console.log($scope.dataToMap);
            //console.log("reached");
            //alert(JSON.stringify($scope.dataToMap));
        });
        $scope.productList = false;
    }

    $scope.submitComment = function () {
        var name = document.getElementById("id_name").value;
        var comment = document.getElementById("id_comment").value;
        if (name == null || comment == null) {
            alert("enter properly");
            return;
        }
        var myOb = {
            userName: name,
            comment: comment,
            idOfProduct: $scope.selectedId,
        };
        productDescriptionService.registerComment(myOb, function (result) {
            if (result == true) {
                alert("Your feedback registered successfuly");
            }
        });
        /*$http.post("http://192.168.10.32:3000/registerComment", myOb).then(function (response) {
            if (response.data == true) {
                alert("Your feedback registered successfuly");
            }
        });*/
    }
    

});

//Controller for Product Master
app.controller("productMasterCntr", function ($scope, $http, productMasterService) {
    $scope.specPage = true;

    function product(pid, name, price, img, techSpec) {
        this._id = pid;
        this.name = name;
        this.price = price;
        this.img = img;
        this.techSpec = techSpec;
    }
    /*
        To Get the list of products at the time of initialization.
    */
    productMasterService.initItemList(function (result) {
        $scope.itemsList = result;
    });

    $scope.goToAddSpec = function (x) {
        $scope.selectedItem = x;
        $scope.specPage = false;
    }
    $scope.addNewSpec = function () {
        if ($scope.newProperty == null || $scope.newValue == null) {
            alert("enter some value");
            return;
        }
        var temp = {
            att: $scope.newProperty,
            value: $scope.newValue
        };
        $scope.newProperty = null;
        $scope.newValue = null;
        $scope.selectedItem.techSpec.push(temp);
    }
    $scope.addNewItemToDb = function () {
        if ($scope.newItemPid == null || $scope.newItemName == null || $scope.newItemPrice == null) {
            alert("Required Fields are missing");
            return;
        }
        if (!($scope.files)) {
            alert("choose a image file");
            return;
        }

        var image = null;
        var fd = new FormData();
        if ($scope.files) {
            image = $scope.files.name;
        }
        for (var i = 0; i < $scope.itemsList.length; i++) {
            if ($scope.newItemPid == $scope.itemsList[i]._id) {
                //console.log(imageList);
                alert("Pid already Exists please re-enter");
                return;
            }
        }
        var newItem = new product($scope.newItemPid, $scope.newItemName, $scope.newItemPrice, image, []);
        fd.append('file', $scope.files);
        fd.append('_id', $scope.newItemPid);
        fd.append('name', $scope.newItemName);
        fd.append('price', $scope.newItemPrice);
        productMasterService.createNewProduct(fd, function (result) {
            if (result == true) {
                alert("Inserted");
                $scope.itemAdder = false;
                $scope.itemsList.push(newItem);
                $scope.newItemPid = null;
                $scope.newItemName = null;
                $scope.newItemPrice = null;
                document.getElementById("id_upload").value = null;
                $scope.files = null;
            }

        });
    }
    /*
        To Add technical specification to an Item
    */
    $scope.doneAdding = function () {
        productMasterService.updateTechSpec($scope.selectedItem, function (result) {
            if (result == true) {
                $scope.specPage = true;
            }
        });
    }
    // Toremove an Item from the product master
    $scope.removeProduct = function (item) {
        var temp = $scope.itemsList.indexOf(item);
        productMasterService.DeleteProduct(item, function (result) {
            if (result == true) {
                $scope.itemsList.splice(temp, 1);
            }
        });
    }

    /*
        To update(remove) technical specification of the product
    */
    $scope.removeProductList = function (idx) {
        var newItemList = {
            _id: $scope.selectedItem._id,
            att: $scope.selectedItem.techSpec[idx].att
        };
        //console.log(newItemList);
        productMasterService.DeleteProductList(newItemList, function (result) {
            if (result == true) {
                $scope.selectedItem.techSpec.splice(idx, 1);
            }
        });
    }
    /*
        Directive to handle the input type file in angular
    */
});
app.directive("fileInput", ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.bind('change', function (parse) {
                $parse(attrs.fileInput).assign(scope, elm[0].files[0]);
                scope.$apply();
            })
        }
    }
}]);




app.controller("loginController", function ($scope, $rootScope) {
    $scope.userViewer = true;
    $scope.adminViewer =true;
    $rootScope.Cartob =[];
    $rootScope.logedInUserId = "C101";
    $scope.login = function () {
        $rootScope.logedInUserId = 'C101';
      
        window.location.href = "#!goToCart";
    }
});

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
});

var cont = app.controller("mycont", function ($scope, $location,$rootScope, addressForm, defaultAddress,placeOrder) {

    var userIdob ={customerId:$rootScope.logedInUserId};
    addressForm.addressFormListInitialization(userIdob,function (result) {

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

        addressForm.addressFormListUpdate(add,function(res){
                alert("inserted");
                addressForm.addressFormListInitialization(userIdob,function (result) {

                    $scope.AddressArray = result;
                });
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
    $scope.DeleteAddress = function (index) {

        var del = $scope.AddressArray[index].Name;
        addressForm.addressFormListDelete(del);

        addressForm.addressFormListInitialization(userIdob,function (result) {

            $scope.AddressArray = result;

        });

    }
    var ob = {
        customerId: $rootScope.logedInUserId
    };
    defaultAddress.getDefaultAddress(ob, function (result) {
        //alert(JSON.stringify(result)+" fetched by default address");
        $rootScope.defaultAddress = result[0].Name+" "+result[0].PhoneNumber+" "+result[0].Address+" "+result[0].City+" "+result[0].State;
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
            $rootScope.Cartob[i].address =  $scope.AddressObjectDefault.Name+" "+$scope.AddressObjectDefault.PhoneNumber+" "+$scope.AddressObjectDefault.Address+" "+$scope.AddressObjectDefault.City+" "+$scope.AddressObjectDefault.State;//JSON.stringify($scope.AddressObjectDefault);
            $rootScope.Cartob[i].orderId = $rootScope.Cartob[i]._id + "" + $rootScope.logedInUserId + "" + new Date();
            $rootScope.Cartob[i].status = 0;
            $rootScope.Cartob[i].customerId = $rootScope.logedInUserId;
            $rootScope.Cartob[i].Date=new Date().toDateString();
        }
        //alert(JSON.stringify($rootScope.Cartob));
        placeOrder.placeOrders($rootScope.Cartob);
        $rootScope.Cartob=null;
        $location.path("/");
    }
    

});
app.controller("diffAddCntr", function ($scope, $rootScope, fetchSingleUserAddress, placeOrder) {
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
            $rootScope.Cartob[i].Date=new Date().toDateString();
        
            
        }
     //   alert(JSON.stringify($rootScope.Cartob));
        //console.log($rootScope.Cartob);
        placeOrder.placeOrders($rootScope.Cartob);
        $rootScope.Cartob=null;
        $location.path("/");
        
        //console.log($scope.address);
    }
    
});

app.filter("myFormat",function(){
    return function(x){
        var temp = JSON.parse(x);
        var text = temp.Name+" "+temp.PhoneNumber+" "+temp.Address+" "+temp.City+" "+temp.State;
        return text;
    }
});
app.controller("orderPageCntr", function ($scope, $rootScope,orderDetailService){
    
    //alert("hello");
    var ob= {customerId:$rootScope.logedInUserId};
    orderDetailService.orderDetailsInitialization(ob,function(callback){
        $rootScope.orderDetail=callback;
        console.log($rootScope.orderDetail);       
    });
    
    $scope.orderDetailCancelOrder=function(index){
       
        var ob= {_id:$rootScope.orderDetail[index]._id};
        orderDetailService.orderDetailsDeletion(ob,function(callback){
if(callback)
{
alert("Order Item Cancelled");
var ob= {customerId:$rootScope.logedInUserId};
orderDetailService.orderDetailsInitialization(ob,function(callback){
    $rootScope.orderDetail=callback;
});
}
else{
alert("error");
}
        });
    }


});
