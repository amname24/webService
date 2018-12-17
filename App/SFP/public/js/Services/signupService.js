videoApp.factory('signupService', ['$http', function ($http) {
    var server = {}
    
    server.register = function(Name,Email,Password,cb){
        var req = {
            name : Name,
            email : Email ,
            password : Password,
        }
        $http.post('user/register',req).then(function(resp){
            cb(resp.data.success);
        });
    }
    return server;
}])