searchApp.controller('searchCtrl', ['searchService', '$http', '$scope', '$location', '$rootScope', function (searchService, $http, $scope, $location, $rootScope) {
    $scope.datas = [];
    var searchInput;
    var filter
    var site
    $scope.load = function () {
        $scope.datas = [];
        searchInput = $location.search().input
        filter = $location.search().filter
        site = $location.search().site
        var query = "http://localhost:8983/solr/BigDP/select?defType=dismax&q.alt=*:*&wt=json&rows=25&q='" + searchInput+"'"
        var qf = "&qf="
        if (site) {
            qf = qf+"source%20"
            query = query +"&fq=source:"+site
        }
        console.log(searchInput, filter, site);
        
        switch (filter) {
            case '1':
                qf = qf + "authors%20title%20uri%20description"
                query = query + qf
                break;
            case '2':
                qf = qf + "authors"
                query = query + qf
                break;
            case '3':
                qf = qf + "authors"
                query = query + qf + "&fl=authors"
                break;
            default:
                qf = qf + "authors%20title%20uri%20description%20source"
                query = query + qf
                break;

        }
        console.log(query);

        $http.get(query).then(function (data) {
            console.log(data.data.response.docs);
            var datas = data.data.response.docs
            $scope.datas = datas
            

        })

        // searchService.searchHav(filter, searchInput, function (res) {
        //     if (res.success) {

        //         if ($scope.datas.length) {
        //             $scope.datas = res.data.concat($scope.datas)

        //         } else $scope.datas = res.data
        //         console.log($scope.datas);
        //     }
        // })
        // searchService.searchArxiv(filter, searchInput, function (res) {
        //     if (res.success) {
        //         if ($scope.datas.length) {
        //             $scope.datas = res.data.concat($scope.datas)

        //         } else $scope.datas = res.data
        //         console.log('data', $scope.datas);
        //     }
        // })
    }

    $rootScope.$on("$locationChangeStart", function (event, next, current) {
        $scope.load()
    });
}]);