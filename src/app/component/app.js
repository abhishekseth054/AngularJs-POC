var myApp = angular.module('myApp', ['ui.router', 'oc.lazyLoad','ngStorage',
            'common.services', 'LocalStorageModule', 
            'ngStorage']); 

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
                         'app/services/users/userResource.js', 'app/services/users/userResourceRole.js'
                    ]
                })
            }]
        }
    })
});