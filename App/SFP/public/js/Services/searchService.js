
searchApp.factory('searchService', ['$http', function ($http) {
    var server = {}
    server.searchHav = function(filter, input, cb){
        var req = {
            filter: filter,
            input: input,
        }        
        var result
        $http.post('/search/hal', req).then(function(res){
            result = res.data
            cb(res.data) 
        })
       
        
    }
    server.searchArxiv = function(filter, input, cb){
        var req = {
            filter: filter,
            input: input,
        }        
        var result
        $http.post('/search/arxiv', req).then(function(res){
            result = res.data
            cb(res.data) 
        })
       
        
    }
    
    
    return server;
}])