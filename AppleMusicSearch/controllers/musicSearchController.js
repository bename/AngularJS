musicSearch.controller('mainController', ['$scope', '$timeout', '$sce', 'musicSearchSvc', '$http', function ($scope, $timeout, $sce, musicSearchSvc, $http) {

    $scope.recentSearches = [];
    $scope.songsList = [];
    $scope.nextSearches = [];

    $scope.showNextSongs = function(){
        if($scope.nextSearches.length >= 10) {
            $scope.nextSearches.length = 0;
            for (var i = 0; i < 10; i++) {
                var song = $scope.songsList.pop();
                if( song === undefined)
                    break;
                if(!$scope.nextSearches.includes(song))
                    $scope.nextSearches.push(song);
            }
        }
        else if ($scope.nextSearches.length > 0){
            $scope.nextSearches.forEach(function(element){
                var song = $scope.songsList.pop();
                if( song !== undefined) {
                    if (!$scope.nextSearches.includes(song))
                        $scope.nextSearches.push(song);
                }
            });
        }
    }
    $scope.searchSongs = function(){
        var bandName = document.getElementById("inputVal").value;
        if($scope.recentSearches.includes(bandName)){
            var index =$scope.recentSearches.indexOf(bandName);
            if (index > -1) {
                $scope.recentSearches.splice(index, 1);
            }
        }
        if(bandName  && !$scope.recentSearches.includes(bandName) ) {
            $scope.recentSearches.push(bandName);
            musicSearchSvc.getSongs(bandName).then(function (result) {
                $scope.songsList = result;
                $scope.nextSearches.length = 0;
                if( $scope.songsList.length > 0)
                    for (var i = 0; i < 10; i++) {
                        var song = $scope.songsList.pop();
                        if(!$scope.songsList.includes(song) && song)
                            $scope.nextSearches.push(song);
                    }
            });
        }
    };

}]);