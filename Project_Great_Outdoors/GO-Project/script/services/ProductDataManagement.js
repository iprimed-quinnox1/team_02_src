app.service("productDataInitialization",function($http){
    this.searchForItem = function(data,callback){
        //alert("reahed here with:----"+JSON.stringify(data));
        $http.post("http://192.168.10.12:3000/productData/getData", data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Some error occured");
            }
        );
    }
    this.GetItem = function(callback){
        $http.get("http://192.168.10.12:3000/productData/getProductData").then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error happend");
            }
        );
    }
});