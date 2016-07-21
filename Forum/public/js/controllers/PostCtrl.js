angular.module('PostCtrl', []).controller('PostController', function($scope) {

	/*$scope.posts = [];
    $scope.addItem = function () {
        $scope.errortext = "";
        if (!$scope.addMe) {return;}
        if ($scope.posts.indexOf($scope.addMe) == -1) {
            $scope.posts.push($scope.addMe);
        } else {
            $scope.errortext = "Post already added!!";
        }
    }
    $scope.removeItem = function (x) {
        $scope.errortext = "";
        $scope.posts.splice(x, 1);
    }*/

var refresh = function() {
  $http.get('/boards').success(function(response) {
    console.log("I got the data I requested");
    $scope.boardlist = response;
    $scope.board = "";
  });
};

refresh();

$scope.addPost = function() {
  console.log($scope.post);
  $http.post('/posts', $scope.post).success(function(response) {
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
    $scope.user = response;
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