app.service("productMasterService",function($http){
    this.initItemList = function(callback){
        $http.get("http://192.168.10.12:3000/productMaster/allItems").then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error happend");
            }
        );
    }
    this.createNewProduct = function(fd,callback){
        $http.post("http://192.168.10.12:3000/productMaster/createNew", fd, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error occured");
            }
        );
    }

    this.updateTechSpec = function(data,callback){
        $http.post("http://192.168.10.12:3000/productMaster/updateTechSpec",data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Some error occcured while updating");
            }
        );
    }

    this.DeleteProduct = function(data,callback){
        $http.post("http://localhost:3000/productMaster/DeleteProduct",data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Some error occured while deleting the product");
            }
        );
    }

    this.DeleteProductList = function(data,callback){
        $http.post("http://localhost:3000/productMaster/DeleteProductList",data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Error occured while deleting tech spec");
            }
        );
    }
});