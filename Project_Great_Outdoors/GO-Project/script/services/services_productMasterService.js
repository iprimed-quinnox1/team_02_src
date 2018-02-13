app.service("productMasterService",function($http){
    this.initItemList = function(callback){
        $http.get(url+"productMaster/allItems").then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error happend");
            }
        );
    }
    this.createNewProduct = function(fd,callback){
        $http.post(url+"productMaster/createNew", fd, {
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
        $http.post(url+"productMaster/updateTechSpec",data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Some error occcured while updating");
            }
        );
    }

    this.DeleteProduct = function(data,callback){
        $http.post(url+"productMaster/DeleteProduct",data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Some error occured while deleting the product");
            }
        );
    }

    this.DeleteProductList = function(data,callback){
        $http.post(url+"productMaster/DeleteProductList",data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Error occured while deleting tech spec");
            }
        );
    }
});