app.service("productDescriptionService",function($http){
    this.searchForItem = function(data,callback){
        //alert("reahed here with:----"+JSON.stringify(data));
        $http.post(url+"productDescription/getData", data).then(
            function(result){
               // alert(JSON.stringify(result.data));
                callback(result.data);
            },
            function(error){
                alert("Some error occured");
            }
        );
    }

    this.registerComment = function(data,callback){
      //  alert("reahed here with:----"+JSON.stringify(data));
        $http.post(url+"productDescription/registerComment", data).then(
            function(result){
                callback(result.data);
            },
            function(error){
                alert("some error occured");
            }
        );
    }
    this.feedbackData = function(ob,callback){
         
         var data={userid:ob};
         //alert("reahed here with:----"+JSON.stringify(data));
          $http.post(url+"productDescription/feedBackData", data).then(function(result){
                  if(result.data){
                 
                  callback(result.data);  
                }else{
                    alert("some error in fetching feedback");
                }
                  
                  
              }          );
      }

});