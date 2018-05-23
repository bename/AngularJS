movieLib.controller('mainController', ['$scope', '$timeout', '$sce', '$http', function ($scope, $timeout, $sce, $http) {

    $scope.moviesList =[];
    $scope.moviesToShow =[];
    $scope.left = 0;
    $scope.right = 3;
    $scope.pictureToShow;
    $scope.brifToShow;
    $scope.browseMobile=0;


    $scope.loadMovies= function(callback){
            $http.get('../resources/movies.json').then(function mySuccess(response, callback) {

                //console.log(response);
                response.data.forEach(function(item){
                    $scope.moviesList.push(item);
                })
                for(var i=0;i<4;i++)
                    $scope.moviesToShow.push($scope.moviesList[i]);
            });
    }

    $scope.nextRight= function(mobile){

        if (mobile && $scope.browseMobile < $scope.moviesList.length){
            $scope.browseMobile++;
            $scope.showMovie({movie: $scope.moviesList[$scope.browseMobile]});

        }
        else if($scope.right < $scope.moviesList.length -1) {
            $scope.right++;
            $scope.left++;
            $scope.moviesToShow = [];
            for (var i = $scope.left; i <= $scope.right; i++)
                $scope.moviesToShow.push($scope.moviesList[i]);

        }
    }
    $scope.nextLeft= function(mobile){
        if (mobile && $scope.browseMobile > 0){
            $scope.browseMobile--;
            $scope.showMovie({movie: $scope.moviesList[$scope.browseMobile]});

        }
        else if($scope.left > 0) {
            $scope.right--;
            $scope.left--;
            $scope.moviesToShow = [];
            for (var i = $scope.left; i <= $scope.right; i++)
                $scope.moviesToShow.push($scope.moviesList[i]);

        }
    }
    $scope.showMovie = function (movie) {
        console.log(movie);
        $scope.pictureToShow=$scope.moviesList[movie.movie.id].picture;
        $scope.brifToShow=$scope.moviesList[movie.movie.id].brif;
        //console.log($scope.pictureToShow );
        //console.log($scope.brifToShow );
    }


    $scope.loadMovies();




}]);