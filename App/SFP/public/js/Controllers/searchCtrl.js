videoApp.controller('searchCtrl', ['videoService', '$http', '$scope', '$location', '$rootScope', function (videoService, $http, $scope, $location, $rootScope) {
    $scope.datas = [];
    var searchInput;
    $scope.load = function () {
        searchInput = $location.search().input
        console.log(searchInput);

        if (!searchInput) {
            $scope.datas = [];
            return;
        }
        videoService.search(searchInput, function (res) {
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