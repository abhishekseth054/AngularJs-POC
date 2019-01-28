'use strict';

myApp.factory('authInterceptorService', ['$q', '$location','localStorageService', 
    function ($q, $location,localStorageService) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};
            var authData = localStorageService.get('authorizationData');
            if (authData) {
                config.headers.Authorization = 'Bearer ' + authData.token;
            } else if ($location.path == '/changePassword') {
                $location.path('/changePassword');
            }
            else if ($location.$$path === '/changePassword') {
                $location.path('/changePassword');
            }
            else if ($location.$$path === '/confirmEmail') {
                $location.path('/confirmEmail');
            }
            else if ($location.$$path ==='/booknow') {
                $location.path('/booknow');
            }
            else if ($location.$$path == '/login') {
                $location.path('/login');
            }

            return config;
        }

        var _responseError = function (rejection) {
        // alert("_responseError" + JSON.stringify(rejection))
            //if (rejection.status === 401) {
            //     $location.path('/login');
            //}
            //if (rejection.status === 500) {
            //    $location.path('/500');
            //}
            

            return $q.reject(rejection);

        
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }
]);

