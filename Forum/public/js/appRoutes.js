angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
        })

        .when('/userPage', {
            templateUrl: 'views/user.html',
            controller: 'UserController'
        })

        .when('/boardAdminPage', {
            templateUrl: 'views/boardAdmin.html',
            controller: 'BoardController'
        })

        .when('/boardUserPage', {
            templateUrl: 'views/boardUser.html',
            controller: 'BoardController'
        })

        .when('/postPage', {
            templateUrl: 'views/post.html',
            controller: 'PostController'    
        });

    $locationProvider.html5Mode(true);

}]);