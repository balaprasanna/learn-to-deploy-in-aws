(function () {
    angular
        .module("todo")
        .controller("MainBodyCtrl", MainBodyCtrl);

    MainBodyCtrl.$inject = ["$http", "PersistSvc"];

    function MainBodyCtrl($http, PersistSvc) {
        var vm = this;

        PersistSvc.listTasks()
            .then(function (tasks) {
                // console.log(tasks);
                vm.listOfTasks = tasks.data;
            });

        //STATUS CODE & MSG OBJECT
        vm.status = {
            message: "",
            code: 0
        };

        //TODAY'S DATE
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
            return today = dd + '/' + mm + '/' + yyyy;
        };

        //Function for displaying task due date
        vm.timeLeft = function (todo) {
            todaysDate();
            if (today == todo.dueDate) {

                return "Today, " + todo.dueTime;
            } else if ((+todo.dueDate.substring(0, 2)) - (+dd) == 1 &&
                (+todo.dueDate.substring(3, 5)) == (+mm)) {


                return "Tomorrow";
            } else {
                // console.log(typeof todo.dueDate);
                // console.log(todo.dueDate);
                // console.log(typeof todaysDate());
                // console.log(today);

                return todo.dueDate + " " + todo.dueTime;
            }
        };

        //FUNCTION FOR UPDATING TASK
        vm.updateTask = function (task) {
            PersistSvc.updateTask(task, function () {
                // console.log('update initiated');
            })
                .then(function (result) {
                    console.log(result);
                    vm.status.message = "Task updated successfully";
                    vm.status.code = 202;
                }).catch(function (err) {
                console.log(err);
                vm.status.message = "An error occurred while updating task";
                vm.status.code = 400;
            })
        };

        //FUNCTION FOR DELETING TASK
        vm.deleteTask = function (task) {
            // console.log('deleteTask initiated');
            PersistSvc.deleteTask(task)
                .then(function (result) {
                    console.log(result);
                    vm.status.message = "Task deleted successfully";
                    vm.status.code = 202;

                    PersistSvc.listTasks()
                        .then(function (tasks) {
                            console.log(tasks)
                            vm.listOfTasks = tasks.data;
                        });

                }).catch(function (err) {
                console.log(err);
                vm.status.message = "An error occurred while deleting task";
                vm.status.code = 400;
            })
        };

// Move list items up or down or swap
        vm.moveItem = function (origin, destination) {
            var temp = vm.listOfTasks[destination];
            vm.listOfTasks[destination] = vm.listOfTasks[origin];
            vm.listOfTasks[origin] = temp;
        };

// Move list item Up
        vm.listItemUp = function (itemIndex) {
            vm.moveItem(itemIndex, itemIndex - 1);
        };

// Move list item Down
        vm.listItemDown = function (itemIndex) {
            vm.moveItem(itemIndex, itemIndex + 1);
        };
    }


})();

