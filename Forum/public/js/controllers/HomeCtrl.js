angular.module('HomeCtrl', []).controller('HomeController', function($location, $scope,$http) {

	$scope.hasError=false;
	$scope.errorMessage="";

	$scope.loginUser = function() {
	  console.log($scope.loginDetail);
	  if($scope.loginDetail==undefined || $scope.loginDetail.username==undefined || $scope.loginDetail.password==undefined){
      	$scope.errorMessage="invalid input";
      	$scope.hasError=true;
      }else if($scope.loginDetail.username=='admin' && $scope.loginDetail.password=='admin'){
		$scope.hasError=false;
		$scope.errorMessage="";
		$location.path('/userPage');	
      }else{
      	$scope.hasError=false;
      	$scope.errorMessage="";
      	$http.post('/login', $scope.loginDetail).success(function(response) {
	    	console.log(response);
	    	$location.path('/boardUserPage');
		  }).error(function (data, status, header, config) {
	            console.log(response);
	            $scope.errorMessage="invalid credential";
      			$scope.hasError=true;
	      });
      }
	};

	$scope.clearMsg = function() {
		$scope.hasError=false;
		$scope.errorMessage="";
	};

});