videoApp.controller('videoPlayerCtrl', ['videoService', '$sce','$rootScope', '$scope', '$location', function (videoService, $sce,$rootScope, $scope, $location) {
    $scope.loadVideo = function (site, videoId) {
        $scope.site = $location.search().site
        $scope.videoId = $location.search().videoId
        console.log($scope.site, $scope.videoId);

        if ($scope.site && $scope.videoId)
            videoService.getVideoInfo($scope.site, $scope.videoId, function (res) {
                $scope.video = res.data
                var video= {
                    name : res.data.name,
                    video_id : res.data.videoId,
                    thumbnailUrl: res.data.thumbnailUrl,
                    description: res.data.description,
                    site :res.data.site
                }
                console.log(video)
                $scope.url = $sce.trustAsResourceUrl($scope.video.embedUrl + $scope.videoId)
                videoService.addVideo(video,function (response) {
                    if (response.success) {
                        if($rootScope.searched){
                            var history = {
                                user_id: $rootScope.userId,
                                video_id: response.video._id
                            }
                            videoService.addHistory(history,function (res) {
                                if(res){
                                    console.log("video added to History");
                                }
                                else
                                    console.log("problem video NOT added to History");   
                            })
                            $rootScope.searched = false;
                        }
                    } else
                        console.log("problem video NOT added and Not found");                
                }
            );
        });
    }
}]);