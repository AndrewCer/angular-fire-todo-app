var app = angular.module("todoApp", ['firebase', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'partials/landing.html',
      controller: 'AuthController'
    })
    .when('/todos', {
      templateUrl: 'partials/todos.html',
      controller: 'TodoController',
      resolve: {user: resolveUser}
    })
    // $locationProvider.html5Mode(true);
    .otherwise({redirectTo: '/'})
})

app.run(function ($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function (event, next, previous, error) {
    if (error === 'AUTH_REQUIRED') {
      $location.path('/')
    }
  })
})

function resolveUser($firebaseAuth) {
  var authRef = new Firebase('https://andrewcerlistdemo.firebaseio.com');
  var authObj = $firebaseAuth(authRef);
  return authObj.$requireAuth();
}
