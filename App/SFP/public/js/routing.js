searchApp.config(function ($stateProvider,$urlRouterProvider) {
    var homeState = {
        name: "home",
        url: "/",
        templateUrl: "view/home/home.html",
        controller: "homeCtrl",
    };
   
    var searchPageState = {
        name: "home.searchPage",
        url: "home/search",
        templateUrl: "view/search/search.html",
        controller: "searchCtrl",
    };
 
    $stateProvider.state(homeState);
    $stateProvider.state(searchPageState);
    $urlRouterProvider.otherwise("/");
})
