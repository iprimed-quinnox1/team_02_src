app.service("defaultAddress",function($http){
    this.getDefaultAddress = function(ob,callback){
        //alert("reaching till here");
        //alert(JSON.stringify(ob));
        $http.post(url+"address/getDefault",ob).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("error");
            }
        );
    }
});