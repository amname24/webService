videoApp.controller('historyCtrl', ['videoService','$http','$rootScope', '$scope', '$cookies','$location',function (videoService,$http,$rootScope, $scope, $cookies, $location) {
    $rootScope.userId;
    $scope.histories = [];
    $scope.load = function(){
        videoService.historysearch($rootScope.userId,function(histories){
            if(histories){
                $scope.histories = histories;
                $scope.histories.sort(function(a,b){
                    return new Date(b.date_watched) - new Date(a.date_watched);
                  })
                console.log(histories);
            }
        });
    }
    $scope.convertDate= function (inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/') + " à "+ [pad(d.getHours()), pad(d.getMinutes())].join(':');
      }
    $scope.playVideo = function (video) {
        $rootScope.searched = false;
        window.location.href = "https://localhost:8090/#!/home/player?site=" + video.site + "&videoId=" + video.video_id
    }
}]);