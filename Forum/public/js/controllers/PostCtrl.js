angular.module('sampleApp.PostCtrl', []).controller('PostController', function($window, $scope, $http, $rootScope) {


var refresh = function() {
  $http.get('/posts/list/'+$rootScope.selectedBoard._id).success(function(response) {
    console.log("I got the data I requested");
    $scope.postList = response;
    $scope.post = "";
  });
};

refresh();

$scope.addPost = function() {
  console.log($scope.post);
  $http.post('/posts/'+ $rootScope.selectedBoard._id, $scope.post).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/posts/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/posts/' + id).success(function(response) {
    $scope.post = response;
  });
};  

$scope.update = function() {
  console.log($scope.post._id);
  $http.put('/posts/' + $scope.post._id, $scope.post).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.post = "";
}

});