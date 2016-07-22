angular.module('sampleApp.PublicBoardCtrl', []).controller('PublicBoardController', function($location,$scope, $http, $rootScope) {

$scope.boardPosts = function(detail){
  $rootScope.selectedBoard = detail;
  $location.path('/publicPostPage');
}

var refresh = function() {
  $http.get('/boards/list').success(function(response) {
    console.log("I got the data I requested");
    $scope.boardlist = response;
    $scope.board = "";
  });
};

refresh();

$scope.addBoard = function() {
  console.log($scope.board);
  if($scope.board.isPublic==undefined) $scope.board.isPublic = false;
  $http.post('/boards/'+ $rootScope.loggedUser._id, $scope.board).success(function(response) {
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
  $http.put('/boards/' + id).success(function(response) {
    $scope.board = response;
  });
};  

$scope.update = function() {
  console.log($scope.board._id);
  if($scope.board.isPublic==undefined) $scope.board.isPublic = false;
  $http.put('/boards/' + $scope.board._id, $scope.board).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.board = "";
}

});