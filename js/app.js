var app = angular.module("todoApp", ['firebase', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/landing.html',
      controller: 'AuthController'
    })
    .when('/todos', {
      templateUrl: 'partials/todos.html',
      controller: 'TodoController'
    })
    // $locationProvider.html5Mode(true);
    .otherwise({redirectTo: '/'})
})
