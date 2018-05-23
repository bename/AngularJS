musicSearch.service('musicSearchSvc', function ($http) {

    this.getSongs = function (bandName) {
        return $http.get('https://itunes.apple.com/search?term=$'+bandName
        ).then(function mySuccess(response) {
            return parseData(response.data, bandName);
        }, function myError(response) {
            return response.statusText;
        });
    };
    
    var parseData = function (data, bandName) {
        var listOfSongs = [];
        data.results.forEach(function(element) {
            if(element === undefined)
                console.log("123");
            listOfSongs.push(element.trackName + ' - ' + element.collectionName + ' - ' + element.releaseDate);
        });
        return listOfSongs.sort();
    }

});