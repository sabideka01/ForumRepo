// public/js/controllers/NerdCtrl.js
angular.module('AuthCtrl', []).controller('AuthController', function($scope, $http) {

    
	$scope.login = function() {
	  console.log($scope.login);
	 /* $http.post('/users', $scope.login).success(function(response) {
	    console.log(response);
	  });*/
	  alert("Came to login");
	};

});