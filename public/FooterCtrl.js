(function () {
    angular
        .module("todo")
        .controller("FooterCtrl", FooterCtrl);

    FooterCtrl.$inject = ["$http", "PersistSvc"];

    function FooterCtrl($http, PersistSvc) {
        var vm = this;
        //Function for total number of tasks
        vm.numberOfTasks = PersistSvc.tasks.length;

        //Function for number of outstanding tasks
        vm.outstandingTasks = function () {
            var result = 0;

            // PersistSvc.tasks.forEach(function (todo, index) {
            //     if(todo.done == false){
            //         result++
            //     }
            // });
            //
            var tasks =  PersistSvc.tasks;
            for (i = 0; i < tasks.length; i++) {
                if (tasks[i].done == 0) {
                    result++
                }
            }
            return result;
        };

        vm.numberOfTasks = function() {
            return PersistSvc.tasks.length;
        }

    }
})();

