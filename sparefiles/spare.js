(function () {
    var todo = angular.module("todo", ['angularjs-datetime-picker']);

    var todoCtrl = function () {
        var ctrl = this;




        // ctrl.todos = [
        //     {text: "Feed the pug", done: false, dueDate: "today", priority: 2},
        //     {text: "Clean my room", done: false, dueDate: "today", priority: 2}
        // ];

        //Function to reformat date
        ctrl.list = function () {
            var d = new Date();
            var DD = ctrl.dueDate.charAt(0) + ctrl.dueDate.charAt(1);
            var MM = ctrl.dueDate.charAt(3) + ctrl.dueDate.charAt(4);
            var YYYY = ctrl.dueDate.charAt(6) + ctrl.dueDate.charAt(7) + ctrl.dueDate.charAt(8) + ctrl.dueDate.charAt(9);
            var dueDateString = DD + "-" + MM + "-" + YYYY;
            ctrl.todos.push({
                text: ctrl.task, done: false, dueDate: ctrl.dueDate, priority: ctrl.priority,
                dueDateString: dueDateString, dueDateStringDD: DD, dueDateStringMM: MM, dueDateStringYYYY: YYYY
            });
            ctrl.task = "";
        };

        // //Function for Today's date
        var todaysDate = function () {
            today = new Date();
            dd = today.getDate();
            mm = today.getMonth() + 1; //January is 0!
            yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            return today = dd + '-' + mm + '-' + yyyy;
        };

        //Function for task's due date
        ctrl.timeLeft = function (todo) {
            todaysDate();
            if (today == todo.dueDateString) {
                var dueTime = todo.dueDate.split(" ");
                return "Today, " + dueTime[1];
            } else if ((+todo.dueDateStringDD) - (+dd) == 1 && todo.dueDateStringMM == mm) {

                return "Tomorrow";
            } else {
                return todo.dueDate;
            }
        };

        //Function for toal number of tasks
        ctrl.totalTodos = function () {
            return ctrl.todos.length;
        };

        //Function for number of outstanding tasks
        ctrl.outstandingTasks = function () {
            var result = 0;
            for (i = 0; i < (ctrl.todos.length); i++) {
                if (ctrl.todos[i].done == false) {
                    result++
                }
            }
            return result;
        };

        //Function to delete task
        ctrl.remove = function (todo) {
            var index = ctrl.todos.indexOf(todo);
            ctrl.todos.splice(index, 1);
        };


    };
    todo.controller("todoCtrl", [todoCtrl]);
})();
