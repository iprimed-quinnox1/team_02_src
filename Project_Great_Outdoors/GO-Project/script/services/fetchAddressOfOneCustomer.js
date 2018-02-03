app.service("fetchSingleUserAddress", function ($http) {
    //alert("Inside Service");
    this.fetchUserAddress = function (object,callback) {
        //alert(JSON.stringify(object));
        $http.post("http://localhost:3000/address/getAddress",object).then(
            function (result) {
                //alert(JSON.stringify(result.data));
                callback(result.data);
            },
            function (error) {
                console.log("error");
            }
        );
    }
});