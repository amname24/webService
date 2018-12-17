
videoApp.factory('searchService', ['$http', function ($http) {
    var server = {}
    server.search = function(filter, input, cb){
        var req = {
            filter: filter,
            input: input,
        }
        console.log(req);
        
        $http.post('/search', req).then(function(res){
            console.log(res.data)            
            cb(res.data) 
        })
    }
 
    
    return server;
}])