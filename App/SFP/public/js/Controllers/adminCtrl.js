videoApp.controller('adminCtrl', ['$http', '$scope', '$cookies','$location',function ($http, $scope, $cookies, $location) {
    $scope.verify = function(){
        console.log('verify');
        
        $http.post('user/adminVerify').then(function(res){
            console.log(res.data);
        });
    }
}]);