videoApp.factory('encryptService', ['$http', function ($http) {

    var server = {}

    server.encrypt = function (plainText, cb) {
        console.log();
        var hashObj = new jsSHA("SHA-512", "TEXT", {
            numRounds: 1
        });
        
        
        hashObj.update(plainText);
        var hash = hashObj.getHash("HEX");
        cb(hash)
    }
    return server;
}])