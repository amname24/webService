
videoApp.controller('homeCtrl', ['$http', '$rootScope','$scope', '$cookies','$location',function ($http,$rootScope, $scope, $cookies, $location) {
 
    $scope.search = function () {
        var searchInput = $scope.searchInput;
        
        console.log('search')
        window.location.href = "https://localhost:8090/#!/home/search?input=" + searchInput
    }
    $scope.load = function () {
        $rootScope.username = $cookies.get('username');
        $rootScope.email = $cookies.get('email');
        $rootScope.userId = $cookies.get('userId');
        $scope.logged = true;
    }
   
}]);