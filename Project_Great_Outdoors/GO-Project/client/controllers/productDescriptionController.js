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