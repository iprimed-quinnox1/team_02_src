/* this will create a custom service,
 http post method to fetch all the data or order who's customer_id is matched */
 app.service("orderDetailService",function($http){

    this.orderDetailsInitialization=function(data,callback){
$http.post("http://192.168.10.12:3000/orderDetail/orderInitialization",data).then(
    function (result) {
if(result){
callback(result.data);
}
else {
    alert("some error in fetching Data");
}
});
}

this.orderDetailsDeletion=function(data,callback){
    $http.post("http://192.168.10.12:3000/orderDetail/orderDeletion",data).then(function(result){
if(result){
callback(true);
}
else{
alert("some error in fetching Data");
     }
     });
}

});