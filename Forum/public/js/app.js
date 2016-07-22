angular.module('sampleApp', ['ngRoute',
 'sampleApp.appRoutes', 
 'sampleApp.HomeCtrl', 
 'sampleApp.UserCtrl', 
 'sampleApp.BoardCtrl', 
 'sampleApp.PostCtrl',
 'sampleApp.PublicBoardCtrl']).run(function($rootScope) {
    $rootScope.loggedUser = undefined;
	$rootScope.isLoggedIn = false;
    $rootScope.selectedBoard = undefined;
    $rootScope.isAdmin = undefined;
});