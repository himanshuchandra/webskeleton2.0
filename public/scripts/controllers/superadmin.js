'use strict';

/**
 * @ngdoc function
 * @name webskeletonApp.controller:SuperadminCtrl
 * @description
 * # SuperadminCtrl
 * Controller of the webskeletonApp
 */
angular.module('webskeletonApp')
  .controller('SuperadminCtrl', function ($scope,superadmin) {

function checkName(element,name){
  if(name==undefined){
    name = "";
  }
  if(element.indexOf('/')>-1 && element.startsWith('/')){
    element = element.split("/")[1];
    name+= element+">";
  }
  else if(element.indexOf('/')>-1 && element.endsWith('/')){
    element = element.split("/")[0];
    name+= element+">";
  }
  if(element.indexOf('/')>-1){
    checkName(element,name);
  }
  return name;
}
$scope.showname = -1;
$scope.play = (index)=>{
  if($scope.showname==index){
    $scope.showname = -1;
  }
  else{
    $scope.showname = index;
  }
 
}

$scope.allocateRight={};
function loadRights(){
    superadmin.loadRights().then((data)=>{
      Object.keys(data.data).forEach(ele=>{
        var oldKey = ele;
        ele = checkName(ele);
        $scope.allocateRight[ele] = data.data[oldKey];
      });
      console.log($scope.allocateRight);
    },(err)=>{
      console.log(err);
    })
}

loadRights();



});
