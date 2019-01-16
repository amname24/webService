searchApp.controller('searchCtrl', ['searchService', '$http', '$scope', '$location', '$rootScope', function (searchService, $http, $scope, $location, $rootScope) {
    $scope.datas = [];
    var searchInput;
    var filter
    $scope.load = function () {
        $scope.datas = [];
        searchInput = $location.search().input
        filter = $location.search().filter


        if (!searchInput || !filter) {
            filter = null
        }
        searchService.searchHav(filter, searchInput, function (res) {
            if (res.success) {

                if ($scope.datas.length) {
                    $scope.datas = res.data.concat($scope.datas)

                } else $scope.datas = res.data
                console.log($scope.datas);
            }
        })
        searchService.searchArxiv(filter, searchInput, function (res) {
            if (res.success) {
                if ($scope.datas.length) {
                    $scope.datas = res.data.concat($scope.datas)

                } else $scope.datas = res.data
                console.log('data', $scope.datas);
            }
        })
    }


    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $scope.load()
    });
}]);