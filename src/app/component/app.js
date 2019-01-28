var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad','ngStorage']); 

myApp.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/login');
    $stateProvider

    // Login Page ========================================
    .state('login', {
        url: '/login',
        templateUrl: 'app/views/login/login.html',
        controller: 'loginCtrl as lg',
        resolve: {
            loginModule: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name: "loginModule",
                    files: ['app/views/login/loginCtrl.js',
                        //'common/services/users/userResource.js', 'common/services/users/userResourceRole.js'
                    ]
                })
            }]
        }
    })
});