(function () {
    angular
        .module("todo")
        .service("PersistSvc", PersistSvc);

    PersistSvc.$inject = ["$http", "$q"];

    function PersistSvc($http, $q) {
        var self = this;

       self.tasks= [];

        this.getTasks = function () {
            return self.tasks;
        };

        //GET METHOD promise to retrieve all the task
        this.listTasks = function () {
            var defer = $q.defer();

            $http.get("/tasks/list")
                .then(function (result) {
                    self.tasks = result.data;
                    defer.resolve(result);
                })
                .catch(function (err) {
                    defer.reject(err);
                });
            return defer.promise;
        };

        //POST METHOD promise for adding task to DB including pushing task to svc obj
        this.saveTask = function (task) {

            var newSplitDate = task.inputDate.split(" ");
            task.dueDate = newSplitDate[0];
            task.dueTime = newSplitDate[1];

            var defer = $q.defer();

            $http.post("/task/save", task)
                .then(function (result) {
                    self.tasks.push(task);
                    defer.resolve(result);
                })
                .catch(function (err) {
                    defer.reject(err.data);
                });
            return defer.promise;
        };

        //PUT METHOD promise for updating DONE status
        this.updateTask = function (task, callback) {
            console.log('update service initiated'); gulp--
            var defer = $q.defer();
            $http.put("/task/update", task)
                .then(function (result) {
                    console.log('update service success');
                    console.log('result: ' + JSON.stringify(result));
                    defer.resolve(result);
                })
                .catch(function (err) {
                    console.log('update service fail');
                    defer.reject(err);
                });
            return defer.promise;
        };

        //DELETE METHOD promise for deleting task
        this.deleteTask = function (task) {

            var defer = $q.defer();

            $http.delete("/task/delete/", {
                data: {id:task.id},
                headers: {"Content-Type" : "application/json;charset=utf8"}
            } )
                .then(function (result) {
                    defer.resolve(result);
                })
                .catch(function (err) {
                    console.log('delete service fail');
                    defer.reject(err);
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
            task.dueDate = "";
            task.dueTime = "";
            return task;
        };



    }


})();
