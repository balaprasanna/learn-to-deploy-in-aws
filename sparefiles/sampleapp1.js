/**
 * Created by phangty on 18/7/16.
 */

(function(){
    angular
        .module("QueryApp", [])
        .controller("queryCtrl", queryCtrl);

    queryCtrl.$inject  = ["$http"];

    function queryCtrl($http){
        var vm = this;

        // start searchByEmployeeNo
        vm.emp_no = 0;
        vm.result  = null;
        // end searchByEmployeeNo

        // start searchByEmployeesByAge
        vm.ageCriteria = "";
        vm.age = "";
        vm.results = [];
        //end searchByEmployeesByAge
        
        vm.searchByEmployeeNo  = function(){
            $http.get("/api/employee/" + vm.emp_no)
                .then(function(result){
                    vm.result = result.data;
                    console.info(vm.result);
                }).catch(function(error){
                    vm.err = error;
            });
        };

        vm.searchByEmployeesByAge = function(){
            $http.get("/api/employees/searchFor/" + vm.ageCriteria + "/" + vm.age)
                .then(function(result){
                    vm.results = result.data;
                    console.info(vm.results);
                }).catch(function(error){
                vm.err = error;
            });
        };
    };

})();