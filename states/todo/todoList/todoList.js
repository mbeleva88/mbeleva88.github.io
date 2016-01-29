(function (angular) {
    'use strict';

    angular
        .module('app')
        .directive('todoList', todoList);
        
    function todoList() {
        var directive = {
            templateUrl: './states/toDo/todoList/todoList.html',
            restrict: 'E',
            controller: controller,
            scope: {
                data: '='
            }
        };

        return directive;
    }

    controller.$inject = ['$scope', 'todo'];
    function controller($scope, todo) {
        $scope.vm = {};
        $scope.addNewTodoInList = addNewTodoInList;
        $scope.todo = todo;
        $scope.vm.editMode = false;
        $scope.editTodoList = editTodoList;
        $scope.saveTodoList = saveTodoList;
        $scope.done = true;

         function addNewTodoInList() {
            todo.addNewTodo($scope.data.id, $scope.vm.name);
            $scope.vm.name = '';
        }

        function editTodoList() {
            $scope.vm.editMode = true;
        }

        function saveTodoList() {
            $scope.vm.editMode = false;
        }
    }

}(angular));