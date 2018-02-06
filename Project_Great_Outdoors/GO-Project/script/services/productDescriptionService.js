app.service("productDescriptionService",function($http){
    this.searchForItem = function(data,callback){
        //alert("reahed here with:----"+JSON.stringify(data));
        $http.post("http://localhost:3000/productDescription/getData", data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("Some error occured");
            }
        );
    }

    this.registerComment = function(data,callback){
      //  alert("reahed here with:----"+JSON.stringify(data));
        $http.post("http://localhost:3000/productDescription/registerComment", data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error occured");
            }
        );
    }

});