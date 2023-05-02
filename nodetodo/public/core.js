var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http, $window) {
  $scope.formData = {};
  $scope.todos = [];
  $scope.cos = "Kalvin";

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function (data) {
      $scope.todos = data;
    })
    .error(function (data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {
    $http
      .post("/api/todos", $scope.formData)
      .success(function (data) {
        document.getElementById("newTodo").value = "";
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  //When task are done
  $scope.markTodoDone = function(todo) {
      todo.done = !todo.done;;
      $http.put('/api/todos/' + todo._id, todo)
          .success(function(data) {
              console.log(data);
          })
          .error(function(data) {
              console.log('Error: ' + data);
          });
  };

  //to change the name

  $scope.openEditModal = function(todo) {
    $scope.editedTodo = angular.copy(todo);
    $('#editModal').modal('show'); // Open Modal Edition
  };
  
  $scope.editTodo = function() {
    $http.put('/api/todos/' + $scope.editedTodo._id, $scope.editedTodo) //Get ID of task to edit text
      .success(function(data) {
        console.log(data);
        $('#editModal').modal('hide'); // Close Modal
        $window.location.reload(); //Reload Page
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  };


  


  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    $http
      .delete("/api/todos/" + id)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };
}
