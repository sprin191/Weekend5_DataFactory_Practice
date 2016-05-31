var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/home', {
      templateUrl: '/views/home.html',
      controller: "PetController",
    })
    .when('/favorites', {
      templateUrl: '/views/favorites.html',
      controller: "PetController"
    })
    .otherwise({
      redirectTo: 'home'
    });
}]);
