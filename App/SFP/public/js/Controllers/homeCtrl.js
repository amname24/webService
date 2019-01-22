searchApp.controller('homeCtrl', ['$http', '$rootScope', '$scope', '$cookies', '$location', function ($http, $rootScope, $scope, $cookies, $location) {

    $scope.filters = [{
            id: 1,
            filter: "Search documents by key word"
        }, {
            id: 2,
            filter: "Search documents by given author"
        }, {
            id: 3,
            filter: "Search co-authors by given author"
        }]
    $scope.sites = ["hal", "arxiv"]
    $scope.search = function () {
        var searchInput = $scope.searchInput;
        var filter = $scope.selectedFilter
        var site = $scope.selectedSite
        var url =  "https://localhost:8090/#!/home/search?"
        var site = $scope.selectedSite
        var url =  "https://localhost:8090/#!/home/search?"
        if(filter){
            url = url+"&filter="+filter.id
        }
        if(site){
            url = url+"&site="+site
        }
        url = url+"&input="+searchInput
        window.location.href = url
    }


}]);