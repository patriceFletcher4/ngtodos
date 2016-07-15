
(function(){
  angular.module('ngtodos') //getter
        .controller('MainController', MainController); //name and associate function (how it behaves)

  MainController.$inject = ['$scope', 'TodoService'];

  function MainController($scope, TodoService){
    $scope.todos = TodoService.todos;
    $scope.create = createTodo;
    $scope.delete = deleteTodo;
    $scope.edit = editTodo
    $scope.update = updateTodo
    getTodos();

  function editTodo(todo){
    todo.editing = true;
  }
  function updateTodo(todo){
    todo.editing = false;
    todo.isComplete = todo.isComplete.toString();
    console.log(todo);
    TodoService.update(todo.id, todo)
              .then(function(){
                getTodos();
              })
  }

  function getTodos(){
    TodoService.readAll()
               .then(function(){
                 $scope.todos = TodoService.todos;
                 console.log($scope.todos);
             })
}

  function createTodo(description){
    TodoService.create(description)
              .then(function(){
                $scope.description = '';
              getTodos();
              })
  }


  function deleteTodo(id){
    console.log(id);
    TodoService.delete(id)
              .then(function(){
                getTodos();
              })
  }
  }
})();
