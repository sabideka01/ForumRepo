angular.module('UserCtrl', []).controller('UserController', function($scope, $http) {


var refresh = function() {
  $http.get('/users').success(function(response) {
    console.log("I got the data I requested");
    $scope.userlist = response;
    $scope.user = "";
  });
};

refresh();

$scope.addUser = function() {
  console.log($scope.user);
  $http.post('/users', $scope.user).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/users/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/users/' + id).success(function(response) {
    $scope.user = response;
  });
};  

$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/users/' + $scope.user._id, $scope.user).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.user = "";
}

});﻿