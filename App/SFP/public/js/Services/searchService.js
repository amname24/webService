
videoApp.factory('videoService', ['$http', function ($http) {
    var server = {}
    server.search = function(input, cb){
        var req = {
            input: input,
            filter: filter
        }
        console.log(req);
        
        $http.post('/search', req).then(function(res){
            console.log(res.data)            
            cb(res.data) 
        })
    }
    
    return server;
}])