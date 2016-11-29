me
/**
 * Created by phangty on 15/7/16.
 */
(function () {
    angular
        .module("RegApp", [])
        .controller("RegCtrl", RegCtrl)
        .controller("ListCtrl", ListCtrl)
        .service("PersistSvc", PersistSvc);

    PersistSvc.$inject = ["$http"];

    function PersistSvc($http) {
        var self = this;
        this.employees = [];

        this.getEmployeeObject = function () {
            var employee = {};
            employee.firstname = "";
            employee.lastname = "";
            employee.gender = "";
            employee.birthday = "";
            employee.hiredate = "";
            return employee;
        };

        this.register = function (employee, successCb, errorCb) {
            $http.post("/api/employee/save", employee)
                .then(function (result) {
                    successCb(result)
                })
                .catch(function (error) {
                    errorCb(error)
                });
            self.employees.push(employee);
        };
    }

    RegCtrl.$inject = ["$http", "PersistSvc"];
    function RegCtrl($http, PersistSvc) {
        var vm = this;
        vm.employee = PersistSvc.getEmployeeObject();
        vm.status = {
            message: "",
            code: 0
        };
        // clarify part below
        vm.register = function () {
            PersistSvc.register(vm.employee,
                function () {
                    console.log("Success");
                }, function () {
                    console.log("Error");
                });
        }
    }

    ListCtrl.$inject = ["PersistSvc", "$scope"];

    function ListCtrl(PersistSvc, $scope) {
        var vm = this;
        vm.employees = PersistSvc.employees;
        $scope.employees = PersistSvc.employees;
    }
})();
