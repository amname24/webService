searchApp.controller('homeCtrl', ['$http', '$rootScope', '$scope', 'searchService', '$location', 
                        function ($http, $rootScope, $scope, searchService, $location) {
    var datas = []
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
    $scope.sites = ["Hal", "Arxiv"]
    $scope.search = function () {
        var searchInput = $scope.solrSearchInput;
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

    $scope.search_and_save = function(){
        var searchInput = $scope.searchInput;
        var site = $scope.selectedSite
         searchService.searchHav(site, searchInput, function (res) {
            if (res.success) {

                if (datas.length) {
                    datas = res.data.concat(datas)

                } else datas = res.data
                console.log(datas);
            }
        })
        searchService.searchArxiv(site, searchInput, function (res) {
            if (res.success) {
                if (datas.length) {
                    datas = res.data.concat(datas)

                } else datas = res.data
                console.log('data', datas);
            }
        })
    }
}]);