app.service("addressForm", function ($http) {
    this.addressFormListUpdate = function (add) {

        return $http.post("http://localhost:3000/addressF/AddressInsertion", add).then(function (response) {

            if (response.data == true) {
                console.log("Inserted");
            }
            else {
                console.log("Error Insertion");
            }

        });
    }

    this.addressFormListInitialization = function (callback) {

        $http.get("http://localhost:3000/addressF/AddressInitialization").then(function (response) {
            if (response) {
                console.log("Whole data fetched ");

                callback(response.data);
            }
            else {
                console.log("Error Feteching");

            }

        });

    }
}); 