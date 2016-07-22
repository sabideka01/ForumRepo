angular.module('sampleApp.HomeCtrl', []).controller('HomeController', function($location, $scope, $http, $rootScope) {

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
		$rootScope.isLoggedIn=true;	
      }else{
      	$scope.hasError=false;
      	$scope.errorMessage="";
      	$http.post('/login', $scope.loginDetail).success(function(response) {
	    	console.log(response);
	    	$rootScope.loggedUser = response;
	    	$rootScope.isLoggedIn=true;
	    	$location.path('/boardUserPage');
		  }).error(function (data, status, header, config) {
	            console.log(response);
	            $scope.errorMessage="invalid credential";
      			$scope.hasError=true;

	      });
      }
	};

	$scope.logoutUser = function() {		  
		    	$rootScope.loggedUser = undefined;
		    	$scope.errorMessage="";
      			$scope.hasError=false;
      			$rootScope.isLoggedIn=false;
		    	$location.path('/home');			  
	};

	$scope.publicBoardPage = function(){
		$location.path('/publicBoardPage');
	}


	$scope.clearMsg = function() {
		$scope.hasError=false;
		$scope.errorMessage="";
	};

});