app.service("defaultAddress",function($http){
    this.getDefaultAddress = function(ob,callback){
        
        $http.post(url+"addressmaster/getDefault",ob).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("error");
            }
        );
    }
});