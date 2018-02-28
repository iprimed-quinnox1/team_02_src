app.service("logisticService",function($http){
    this.fetchAllData = function(callback){
        $http.get(url+"logistic/getAllData").then(
            function(response){
                callback(response.data);
            },
            function(error){
                alert("some error occured");
            }
        );
    }

    this.updateStatus = function(ob,callback){
        //alert(JSON.stringify(ob)+" from service");
        //console.log(ob);
        $http.post(url+"logistic/updateStatus",ob).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error occured");
            }
        );
    }
});