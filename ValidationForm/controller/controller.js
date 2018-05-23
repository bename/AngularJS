validationForm.controller('mainController', ['$scope', '$timeout', '$sce', '$http', function ($scope, $timeout, $sce, $http) {

    $scope.lastName=false;
    $scope.emailError=false;
    $scope.firstNameError=false;
    $scope.lastNameError=false;
    $scope.passError=false;
    $scope.page2=false;
    $scope.firstName ;
    $scope.tableData = [["Evyatar","Ben ami","ev@gmail.com"],["yoni","malka","yoss@gmail.com"],["moni","ronen","bar@gmail.com"]];

    $scope.$watch('firstName',function (value) {
        var target = {value: value, id: "first"};
        $scope.validateField(target);
    })



    $scope.validateField= function(target){
        var patt;
        switch (target.id){
            case 'first' :
                patt = /^[a-z ,.'-]+$/i;
                if(patt.test(target.value) || target.value === '')
                    $scope.firstNameError=false;
                else
                    $scope.firstNameError=true;
                break;

            case 'last' :
                patt = /^[a-z ,.'-]+$/i;
                if(patt.test(target.value) || target.value === '')
                    $scope.lastNameError=false;
                else
                    $scope.lastNameError=true;
                break;

            case 'email' :
                patt = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(patt.test(target.value) || target.value === '')
                    $scope.emailError=false;
                else
                    $scope.emailError=true;
            case 'password' :

        }


    }

    $scope.changePage= function(target){
        var pass = document.getElementById("password").value;
        if(pass === '')
            $scope.passError=true;
        else {
            $scope.passError = false;
            $scope.page2 = !$scope.page2;
        }
    }
    
    $scope.addDataToTable = function () {
        var first = document.getElementById("first").value;
        var last = document.getElementById("last").value;
        var email = document.getElementById("email").value;
        if(first && last && email) {
            var tableRow = [first, last, email];
            $scope.tableData.push(tableRow);
        }

    }





}]);