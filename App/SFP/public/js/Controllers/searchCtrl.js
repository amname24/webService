videoApp.controller('searchCtrl', ['searchService', '$http', '$scope', '$location', '$rootScope', function (searchService, $http, $scope, $location, $rootScope) {
    videos = [];
    var searchInput;
    $scope.load = function () {
        searchInput = $location.search().input
        console.log(searchInput);

        if (!searchInput) {
            $scope.video = [];
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