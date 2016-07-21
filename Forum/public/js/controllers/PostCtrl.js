angular.module('PostCtrl', []).controller('PostController', function($scope) {

	$scope.posts = [];
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
    }

});