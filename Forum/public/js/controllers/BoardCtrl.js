angular.module('BoardCtrl', []).controller('BoardController', function($scope) {

	
var refresh = function() {
  $http.get('/boards').success(function(response) {
    console.log("I got the data I requested");
    $scope.boardlist = response;
    $scope.board = "";
  });
};

refresh();

$scope.addBoard = function() {
  console.log($scope.user);
  $http.post('/boards', $scope.board).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/boards/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/boards/' + id).success(function(response) {
    $scope.user = response;
  });
};  

$scope.update = function() {
  console.log($scope.user._id);
  $http.put('/boards/' + $scope.board._id, $scope.board).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.board = "";
}

});