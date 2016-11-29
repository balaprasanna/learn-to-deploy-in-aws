(function () {
    angular
        .module("todo", ['angularjs-datetime-picker'])
        .controller("todoCtrl", todoCtrl)
        .service("PersistSvc", PersistSvc)

    PersistSvc.$inject = ["$http", "$q"];

    function PersistSvc($http, $q) {
        var self = this;

        //GET METHOD promise to retrieve all the task
        this.listTasks = function (tasks, callback) {
            var defer = $q.defer();
            $http.get("/tasks/list", tasks)
                .then(function (err) {
                    defer.reject(err);
                }).catch(function (result) {
                defer.resolve(result);
            });
            return defer.promise;
        };

        //POST METHOD promise for adding task to DB including pushing task to svc obj
        this.saveTask = function (task, callback) {
            $http.post("/task/save", task)
                .then(function (err) {
                    defer.reject(err);
                }).catch(function (result) {
                defer.resolve(result);
            });
            self.tasks.push(task);
            return defer.promise;
        };

        //PUT METHOD promise for updating DONE status
        this.updateTask = function (task, callback) {
            $http.put("/task/update", task)
                .then(function (err) {
                    defer.reject(err);
                }).catch(function (result) {
                defer.resolve(result);
            });
            return defer.promise;
        };

        //DELETE METHOD promise for deleting task
        this.deleteTask = function (task, callback) {
            $http.delete("/task/delete", task)
                .then(function (err) {
                    defer.reject(err);
                }).catch(function (result) {
                defer.resolve(result);
            });
            return defer.promise;
        };

        //TASK FACTORY
        this.tasksObject = function () {
            var task = {};
            task.text = "";
            task.done = "";
            task.priority = "";
            task.inputDate = "";
            var newSplitDate = task.inputDate.split(" ");
            task.dueDate = newSplitDate[0];
            task.dueTime = newSplitDate[1];
            return task;
        };

    }


    todoCtrl.$inject = ["$http", "PersistSvc"];

    function todoCtrl($http, PersistSvc) {
        var vm = this;

        vm.listOfTasks = PersistSvc.listTasks();
        vm.task = PersistSvc.taskObject();
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
            return today = dd + '-' + mm + '-' + yyyy;
        };

        //Function for displaying task due date
        vm.timeLeft = function () {
            todaysDate();
            if (today == PersistSvc.task.dueDate) {
                return "Today, " + PersistSvc.task.dueTime;
            } else if ((+PersistSvc.task.dueDate.substring(0, 2)) - (+dd) == 1 &&
                (+PersistSvc.task.dueDate.substring(3, 5)) == mm) {
                return "Tomorrow";
            } else {
                return PersistSvc.task.dueDate + " " + PersistSvc.task.dueTime;
            }
        };

        //FUNCTION FOR SAVING NEW TASK
        vm.saveTask = function () {
            PersistSvc.saveTask(vm.task)
                .then(function (err) {
                    console.log(err);
                    vm.status.message = "An error occurred while saving task";
                    vm.status.code = 400;
                }).catch(function (result) {
                console.log(result);
                vm.task = PersistSvc.taskObject();
                vm.status.message = "Task saved successfully";
                vm.status.code = 202;
            })
        };

        //FUNCTION FOR UPDATING TASK
        vm.updateTask = function () {
            PersistSvc.updateTask(task)
                .then(function (err) {
                    console.log(err);
                    vm.status.message = "An error occurred while updating task";
                    vm.status.code = 400;
                }).catch(function (result) {
                console.log(result);
                vm.status.message = "Task updated successfully";
                vm.status.code = 202;
            })
        };

        //FUNCTION FOR DELETING TASK
        vm.deleteTask = function () {
            PersistSvc.deleteTask(task)
                .then(function (err) {
                    console.log(err);
                    vm.status.message = "An error occurred while deleting task";
                    vm.status.code = 400;
                }).catch(function (result) {
                console.log(result);
                vm.status.message = "Task deleted successfully";
                vm.status.code = 202;
            })
        };


        //Function for toal number of tasks
        vm.totalTodos = vm.listOfTasks.length;

        //Function for number of outstanding tasks
        vm.outstandingTasks = function () {
            var result = 0;
            for (i = 0; i < vm.totalTodos; i++) {
                if (vm.listOfTasks[i].done == false) {
                    result++
                }
            }
            return result;
        };
    }

})();