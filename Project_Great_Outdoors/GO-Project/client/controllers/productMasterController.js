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