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

//variables

$scope.selectRight = [];
$scope.showname = -1;
$scope.allocateRight={};
$scope.selectedRole="";

//functions
$scope.returnRight =(right)=>{
  var flag=0;
  if($scope.selectedRole){
  $scope.selectedRole.rights.forEach(x=>{
    if(x.name==right){
      $scope.checkright(right);
      flag = 1;
      return false;
    }
  });
  }
  if(flag==1){
    return true;
  }
  else{
    return false;
  }
  // return false;
}

function checkName(element,name){
  console.log($scope.allocateRight);
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

$scope.hideRightHead = (index)=>{
  if($scope.showname==index){
    $scope.showname = -1;
  }
  else{
    $scope.showname = index;
  }
 }

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

$scope.submitRole = ()=>{
  console.log($scope.selectRight);
  superadmin.createRole($scope.role_name).then((data)=>{
    if(data.message == 'success'){
      loadRoles();
      $scope.createRoleMsg = data.message;
    }
    
  },(err)=>{
    console.log(err);
  })
}

$scope.checkright = (data)=>{
  if(!$scope.selectRight.includes(data)){
    $scope.selectRight.push(data);
  }
  else{
    delete $scope.selectRight[$scope.selectRight.indexOf(data)];
    $scope.selectRight = $scope.selectRight.filter((x)=>{
      if(x.length>0){
        return x;
      }
    })
  }
}

$scope.AllocateRight = ()=>{
  if($scope.selectedRole!=undefined && $scope.selectRight!=undefined){
  let obj = {
    'roleid':$scope.selectedRole.roleid,
    'rights':$scope.selectRight
  }
   superadmin.updateRights(obj).then((data)=>{
     $scope.allocateRightMsg = data.message;
   },(err)=>{
     $scope.allocateRightMsg = 'Please try again later';
   })

  }
  else{
    $scope.allocateRightMsg = 'Please select appropriate options';
  }
}

$scope.allocateRole = ()=>{
  if($scope.user_email.trim().length>0){
    let obj = {
    'role':$scope.selectedRole.role,
    'email':$scope.user_email
  }
    superadmin.assignRole(obj).then((data)=>{
      $scope.allocateRoleMsg = data.message;
    },(err)=>{
      $scope.allocateRoleMsg = 'Please try again later';
    });
  }
  else{
    $scope.allocateRoleMsg = 'Enter valid email';
  }
}

$scope.deleteRole = ()=>{
  let obj = {
    'roleid':$scope.selectedRole.roleid,
  }
  superadmin.deleteRole(obj).then((data)=>{
    if(data.message=='success'){
      $scope.deleteRoleMsg = data.message;
      loadRoles();
    }
    },(err)=>{
      $scope.deleteRoleMsg = 'Please try again later';
    });
}

function loadRoles(){
  superadmin.loadRoles().then((data)=>{
    $scope.roles = data.data;
    // $scope.assignedRoles = data.data
    $scope.selectedRole = data.data[0];
  },(err)=>{
    console.log(err);
  })
}


//function calls

loadRoles();
loadRights();



});
