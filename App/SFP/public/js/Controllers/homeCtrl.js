videoApp.controller('homeCtrl', ['$http', '$rootScope', '$scope', '$cookies', '$location', function ($http, $rootScope, $scope, $cookies, $location) {

    $scope.filters = ["laboratory", "institution", "researchteam"]
    $scope.search = function () {
        var searchInput = $scope.searchInput;
        var filter = $scope.selectedFilter

        if (filter)
            window.location.href = "https://localhost:8090/#!/home/search?filter=" + filter + "&input=" + searchInput
        else
            window.location.href = "https://localhost:8090/#!/home/search?input=" + searchInput
    }
    

}]);