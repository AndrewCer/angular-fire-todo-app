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
