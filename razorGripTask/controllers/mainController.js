tasksDisplay.controller('mainController', ['$scope', '$timeout', '$sce', '$http', function ($scope, $timeout, $sce, $http) {

    $scope.tasksList = [];
    $scope.taskD ="";
    $scope.taskN ="";
    $scope.taskT ="";
    $scope.index =0;
    $scope.countries = {} ;

    /*
    This function will load all the tasks from the JSON file,
    put it into and array and call "loadTask" function with the first task to be loaded.
    */

    $scope.loadTasks= function(){
        $http.get('../resources/home_assignment.json').then(function (response) {
            $scope.tasksList = response.data.frontend_home_questionnaire.tasks ;
            //console.log(tasksPath);
            $scope.loadTask(0);
        });
    };

    /*
    This function will load all the countries from the JSON file.
    At first it will initialize the "countries" object with the countries (no duplications),
    and then for every Key (country) will push its cities to its Value (array) again with no duplications.
    */

    $scope.loadCountries= function(){
        $http.get('http://northwind.servicestack.net/customers.json').then(function (response) {

            //console.log(response.data.Customers);
            response.data.Customers.forEach(function (item) {
                if(!$scope.countries.hasOwnProperty(item.Country)) {
                    $scope.countries[item.Country] = [];
                }
            });
            response.data.Customers.forEach(function (item) {
                if(!$scope.countries[item.Country].includes(item.City)) {
                    $scope.countries[item.Country].push(item.City)
                }
            })
        });
    };

    /*
    This function will load the relevant task by index and display it on the DOM.
    */

    $scope.loadTask = function (index) {
        $scope.taskN = $scope.tasksList[index].taskName;
        $scope.taskT = $scope.tasksList[index].taskType;
        $scope.taskD = $scope.tasksList[index].description;
    };

    /*
    This function will run after clicking on the right arrow sign.
    It will increase the index within the tasks array and will go back to start when reaching the end.
    */

    $scope.nextRight = function () {
        if($scope.index === $scope.tasksList.length -1) {
            $scope.index = 0;
            $scope.loadTask($scope.index);
        }
        else {
            $scope.loadTask(++$scope.index);
        }
    };

    /*
    This function will run after clicking on the left arrow sign.
    It will decrease the index within the tasks array and will go back to the end when reaching the start.
    */

    $scope.nextLeft = function () {
        if($scope.index === 0) {
            $scope.index = $scope.tasksList.length - 1;
            $scope.loadTask($scope.index);
        }
        else {
            $scope.loadTask(--$scope.index);
        }

    };

    /*
    Initiate the applications.
    */

    $scope.loadTasks();
    $scope.loadCountries();
}]);