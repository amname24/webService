videoApp.config(function ($stateProvider,$urlRouterProvider) {
    var homeState = {
        name: "home",
        url: "/",
        templateUrl: "view/home/home.html",
        controller: "homeCtrl",
    };
    var loginState = {
        name: "login",
        url: "/login",
        templateUrl: "view/login/login.html",
        controller: "loginCtrl",
    };
    var signinState = {
        name: "signup",
        url: "/signup",
        templateUrl: "view/signup/signup.html",
        controller: "signupCtrl",
    };
    var searchPageState = {
        name: "home.searchPage",
        url: "home/search",
        templateUrl: "view/search/search.html",
        controller: "searchCtrl",
    };
    var videoPlayerState = {
        name :"home.videoPlayer",
        url: "home/player",
        templateUrl: "view/search/player.html",
        controller: "videoPlayerCtrl",
    }
    var historyPageState = {
        name: "home.historyPage",
        url: "home/history",
        templateUrl: "view/search/history.html",
        controller: "historyCtrl",
    };
    var adminPageState =  {
        name: "admin",
        url: "/admin",
        templateUrl: "view/admin/admin-home.html",
        controller: "adminCtrl",
    }

    $stateProvider.state(homeState);
    $stateProvider.state(loginState);
    $stateProvider.state(signinState);
    $stateProvider.state(searchPageState);
    $stateProvider.state(videoPlayerState);
    $stateProvider.state(historyPageState);
    $stateProvider.state(adminPageState);
    $urlRouterProvider.otherwise("/");
})

angular.module('videoApp').run(['$cookies', '$location','loginService', function ($cookies,$location,loginService) {

    // var token = $cookies.get('token');
    // console.log(token);
    // loginService.verify(token,function(res){
    //     if (!res.data.success) {
    //         $location.path('/login');
    //     }
    // })

  }]);