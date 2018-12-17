videoApp.controller('searchCtrl', ['searchService', '$http', '$scope', '$location', '$rootScope', function (searchService, $http, $scope, $location, $rootScope) {
    videos = [];
    var searchInput;
    var filter
    $scope.load = function () {
        searchInput = $location.search().input
        filter = $location.search().filter
        console.log(searchInput);

        if (!searchInput || !filter) {
           filter = null
        }
        searchService.search(filter, searchInput, function (res) {
            if (res.success) {

                $scope.datas = res.data
                console.log(res.data);

            }
        })
    }
    
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        $scope.load()
        
    });
}]);