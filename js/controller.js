app.controller('AuthController', ['$scope', '$location', '$firebaseAuth', function ($scope, $location, $firebaseAuth) {
  var authRef = new Firebase('https://andrewcerlistdemo.firebaseio.com');
  var authObj = $firebaseAuth(authRef);
  $scope.register = function () {
    authObj.$createUser($scope.user)
    .then(function () {
      $scope.login();
    })
  }
  $scope.login = function () {
    authObj.$authWithPassword($scope.user)
    .then(function () {
      $location.path('/todos')
    })
    .catch(function (error) {
      if (error.code === 'INVALID_PASSWORD') {
        $scope.passwordError = "Password and Email do not match"
      }
      if (error.code === 'INVALID_USER') {
        $scope.usernameError = "Incorrect email address"
      }
    })
  }
}])

app.controller('TodoController', ['$scope', '$firebaseArray', function ($scope, $firebaseArray) {
  var todosRef = new Firebase('https://andrewcerlistdemo.firebaseio.com/list');
  $scope.todos = $firebaseArray(todosRef);
  //{text: 'some todo', completed: false}
  $scope.newTodo = {text: '', completed: false};
  $scope.addTodo = function (input) {
    $scope.todos.$add($scope.newTodo)
    .then(function (data) {
      $scope.newTodo.text = '';
    })
  }
  $scope.removeTodo = function (todo) {
    $scope.todos.$remove(todo)
  }
  $scope.updateTodo = function (todo) {
    if (todo.completed) {
      todo.completed = false
    }
    else {
      todo.completed = true;
    }
    $scope.todos.$save(todo)
  }
}])
