(function (angular) {
    'use strict';

    angular
        .module('app')
        .factory('todo', service);

    service.$inject = ['$http'];

    var idLists = 1;
    var idTodos = 1;
    var todoListArray = [];
    function service($http) {
        return {
            todoLists: todoListArray,
            addList: addTodoList,
            addNewTodo: addTodoInList,
            removeById: removeById
        };

        // Add TODO List
        function addTodoList(name) {
            if (name == "") {
                alert('The list name cannot be empty!');
            } else if (isDuplicatedList(name)) {
                alert('The list already exists!');
            } else {
                if (todoListArray.length > 0) {
                    var last = _.last(todoListArray);
                    idLists = last.id + 1; 
                }

                var todoList = {
                    id: idLists, 
                    name: name, 
                    todos: []
                };

                todoListArray.push(todoList);
                }
            }

        // Add task in TODO List
        function addTodoInList(listId, name) {
            if (!name || name == "") {
                alert('The task name cannot be empty!') 
            } else {
            var list = _.find(todoListArray, function(obj) { 
                return obj.id == listId; }); 

                if (isDuplicatedTodo(list, name)) {
                    alert('The task already exists!')
                } else {   
                    if (list && list.todos.length > 0) {
                     var lastTodo = _.last(list.todos);
                     idTodos = lastTodo.id + 1; 
                 }
                    var todo = {
                    id: idTodos, 
                    name: name
                };

                list.todos.push(todo);
                }
            }
        }

        // Check if TODO List is duplicated
        function isDuplicatedList(name) {
            return _.some(todoListArray, function(todoList) { 
                    return todoList.name == name; 
                });
            }

        // Check if todo in TODO List is duplicated
        function isDuplicatedTodo(list, todoName) {
            return _.some(list.todos, function(todo) { 
                    return todo.name == todoName; 
                });
            }

        function removeById(list, id) {
            var index = _.findIndex(list, function(obj) { 
                 return obj.id == id; 
            });
                list.splice(index, 1);
            }
    }
}(angular));