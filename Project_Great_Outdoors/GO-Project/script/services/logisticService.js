app.service("logisticService",function($http){
    this.fetchAllData = function(callback){
        $http.get("http://localhost:3000/logistic/getAllData").then(
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
        $http.post("http://localhost:3000/logistic/updateStatus",ob).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error occured");
            }
        );
    }
});