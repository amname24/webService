
videoApp.controller('homeCtrl', ['$http', '$rootScope','$scope', '$cookies','$location',function ($http,$rootScope, $scope, $cookies, $location) {
 
    $scope.sites = ["laboratory","institution","researchteam"]
    $rootScope.filter='';
    $rootScope.input='';
    $scope.search = function (searchInput,selectedSite) {
        $rootScope.filter = selectedSite
        $rootScope.input = searchInput;
        if($scope.selectedSite)
            window.location.href = "https://localhost:8090/#!/home/search" ;
    }
    $scope.load = function () {
    
    }
   
}]);