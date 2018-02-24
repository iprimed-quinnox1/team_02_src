app.service("addressForm", function ($http) {
    this.addressFormListUpdate = function (add,cbk) {
        //alert("Came to refetch the data with"+"   "+JSON.stringify(add));
        return $http.post(url+"addressF/AddressInsertion", add).then(
            function (response) {
                if (response.data == true) {
                cbk(true);
            }},
            function(error){
                alert("Error Insertion");
            }
        );
    }

    this.addressFormListInitialization = function (ob,callback) {

        $http.post(url+"addressF/AddressInitialization",ob).then(function (response) {
            if (response) {
                console.log("Whole data fetched ");

                callback(response.data);
            }
            else {
                console.log("Error Feteching");

            }

        });

    }
    this.addressFormListDelete = function (del) {
        var data = {name:del};
        return $http.post(url+"addressF/AddressDelete", data).then(function (response) {

            if (response.data == true) {
                alert("deleted");
            }
            else {
                alert("Error deletion");
            }

        });
    }
    this.addressDefaultSet = function (set,callback) {
        
        return $http.post(url+"addressF/AddressDefaultSet", set).then(function (response) {

            if (response.data == true) {
             //   alert("changed default");
                callback(response);
            }
            else {
                alert("Error setting");
            }

        });
    }
    this.addressDefault=function(set,callback){
    return $http.post(url+"addressF/AddressDefault", set).then(function (response) {

            if (response.data == true) {
              // alert("changed default address");
              callback(response);
            }
            else {
                alert("Error setting");
            }

        });
    }
}); 