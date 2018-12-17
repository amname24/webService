videoApp.controller('searchCtrl', ['searchService', '$http', '$scope', '$location', '$rootScope', function (searchService, $http, $scope, $location, $rootScope) {
    $scope.datas = [];
    var searchInput;
    var searchFilter;
    $scope.load = function () {
        searchInput = $rootScope.input;
        searchFilter = $rootScope.filter;
        console.log(searchInput+searchFilter);

        if (!searchInput) {
            $scope.datas = [];
            return;
        }
        if (searchFilter) {
            searchService.searchFilter(searchInput,searchFilter, function (res) {
                if (res.success) {
                    $scope.datas = res.data
                    console.log(res.data);
                }
            })
        }
        else{
            searchService.search(searchInput, function (res) {
                if (res.success) {
                    $scope.datas = res.data
                    console.log(res.data);
                }
            })
        }
    }
    
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        $scope.load()
    });
}]);