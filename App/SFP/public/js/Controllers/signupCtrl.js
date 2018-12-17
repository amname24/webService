videoApp.controller('signupCtrl', ['signupService', 'encryptService', '$scope', '$window', '$state', function (signupService, encryptService, $scope, $window, $state) {
    $scope.register = function () {
        var hashPw
        encryptService.encrypt($scope.Password, function (res) {
            console.log(res);
            hashPw = res
        })
        if (hashPw != null)
            signupService.register($scope.Name, $scope.Email,  hashPw , function (resp) {
                if (resp) {
                    $window.alert(" votre compte est créé !");
                    $state.go('login');
                } else
                    $window.alert("cette adresse email est deja utilisée pour un autre compte !");
            });
    }
}])