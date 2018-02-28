app.controller("homePageCntr", function ($scope,$window,$rootScope, productMasterService, productDescriptionService, productDataInitialization) {
    //$scope.MyItems=JSON.parse(localStorage.ItemList);
    //$window.location.reload();
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



    $scope.goToCart = function () {
        // alert("reached");
        window.location.href = "#!goToCart";
    }

    $scope.AddToCart = function () {


        var myOb = {
            lastSearchedPid: $scope.selectedId
        };

        if( !$rootScope.Cartob){
            $rootScope.Cartob = [];
        }
        productDataInitialization.searchForItem(myOb, function (result) {
            result.quantity = 1;
            $rootScope.Cartob.push(result);
            alert("Added To Cart");
            $scope.productList = true;

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
        $scope.getRegisterdUserFeedbacks=function(){
        
           // alert("aaya");
            var userid = $scope.selectedId;
            productDescriptionService.feedbackData(userid, function (callback) {
                if (callback) {
                    $scope.feedback = callback;
                    // alert(JSON.stringify(feedback));
                }
                else {
                    alert("error");
                }

            });
        } 
        $scope.getRegisterdUserFeedbacks();
    }

    $scope.submitComment = function () {
       
        var name = $scope.commentUserName;
        var comment = $scope.comment;
        if (name == null || comment == null) {
            alert("Missing review details");
            return;
        }
        var myOb = {
            userName: name,
            comment: comment,
            idOfProduct: $scope.selectedId,
            date:new Date().toDateString()
          };
        productDescriptionService.registerComment(myOb, function (result) {
            if (result == true) {
                
                $scope.commentUserName = null;
                $scope.comment = null;
                $scope.getRegisterdUserFeedbacks();               
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