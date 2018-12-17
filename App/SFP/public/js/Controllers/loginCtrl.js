// var loginPage = angular.module("loginPage", [])

videoApp.controller('loginCtrl', ['loginService', 'encryptService','$location', '$scope', '$state', '$cookies', function (loginService, encryptService,$location, $scope, $state, $cookies) {
    $cookies.remove('token');
    $cookies.remove('username');
    $cookies.remove('email');
    $cookies.remove('userId');
    $scope.login = function () {
        var hashPw
        encryptService.encrypt($scope.password, function (res) {
            console.log(res);            
            hashPw = res
        })
        if (hashPw != null)
            loginService.login($scope.email, hashPw, function (res) {
                console.log(res.data)
                if (res.data.success) {
                    var username = res.data.username;
                    var userId = res.data.userId;
                    var token = res.data.token;
                    var now = new Date()
                    $cookies.put('token', token, {expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDate())});
                    $cookies.put('username', username,{expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDate())});
                    $cookies.put('email', $scope.email,{expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDate())});
                    $cookies.put('userId', userId,{expires: new Date(now.getFullYear(), now.getMonth()+1, now.getDate())});

                    console.log("token : "+$cookies.get('token'));
                    console.log("username : "+$cookies.get('username'));
                    console.log("email : "+$cookies.get('email'));
                    console.log("userId : "+$cookies.get('userId'));

                    //$location.path('/');
                    $state.go('home');
                } else
                    alert('email or password is not correct');
            })
    };

}])