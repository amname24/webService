
videoApp.factory('loginService', ['$http', function ($http) {
    var server = {}
    server.login = function(email, password, cb){
        var user = {
            email: email,
            password: password
        };
        console.log(user);
        $http.post('/user/login', user).then(function(res){
            cb(res) 
        })
    }
    server.verify= function(token,cb){
        var req = {
            token : token
        }
        $http.post('/user/verify',req).then(function(res){
            cb(res) 
        })
    }
    return server;
}])