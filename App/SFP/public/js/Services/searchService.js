
videoApp.factory('searchService', ['$http', function ($http) {
    var server = {}
    server.search = function(filter, input, cb){
        var req = {
            filter: filter,
            input: input,
        }        
        $http.post('/search', req).then(function(res){
            cb(res.data) 
        })
    }
    
    
    return server;
}])