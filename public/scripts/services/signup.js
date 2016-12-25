'use strict';

/**
 * @ngdoc service
 * @name webskeletonApp.signup
 * @description
 * # signup
 * Factory in the webskeletonApp.
 */
angular.module('webskeletonApp')
  .factory('signup', function ($http,$q) {
   //var data= {key,value};
    var userdata=[];

    var object = {
       // mydata:"",

        registerUser:function(userObject){
          var defer = $q.defer(); $http.post('http://localhost:1234/allroutes/register',userObject).then(function(data){
               defer.resolve(data);
           },function(error){
               defer.reject(error);
           }) 
            return defer.promise;
        }
       /* ,
        passdata:function(finaldata){
            console.log("DATA IS................ ",finaldata);
            this.mydata = finaldata;
            console.log("After MYDATA ",this.mydata);
           //setdata(finaldata);//return finaldata;
           console.log(this.userdata);
        } 
        */
        };
        
     

    return object;
  });
