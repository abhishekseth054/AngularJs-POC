/**
 * Created by SANJEEV on 11/10/2015.
 */
'use strict';
var isDefined = angular.isDefined,
    isUndefined = angular.isUndefined,
    isNumber = angular.isNumber,
    isObject = angular.isObject,
    isArray = angular.isArray,
    extend = angular.extend,
    toJson = angular.toJson;

'use strict';
myApp.factory('authService', ['$http', '$q', 'appSettings', 'localStorageService',
    function ($http, $q, appSettings, localStorageService) {
    
    var serviceBase = appSettings.serverPath;

   alert("IN AUTH SERVICE");
        var authServiceFactory = {};

        var _authentication = {
            isAuth: false,
            userName : ""
        };

        var _saveRegistration = function (registration) {

            _logOut();

            return $http.post(serviceBase + 'api/accounts/register', registration).then(function (response) {
                return response;
            });
        };

        var _login = function (loginData) {

           alert("In JsAuthService " + JSON.stringify(loginData))

            var data = {
                        "email": loginData.userName,
                        "password": loginData.password
                        }

            var deferred = $q.defer();
            alert("data " + JSON.stringify(data))
            $http.post(serviceBase + 'auth/login', data, {
                headers: { 
                            'Content-Type':'application/json'
                         }
            }).then(function (response) {
               // alert("POSTING LOGIN ******************* "+JSON.stringify(response));
                localStorageService.set('authorizationData',
                        { token: response.data.auth_token, UserName: loginData.userName });
                _authentication.isAuth = true;
                _authentication.UserName = loginData.userName;

                deferred.resolve(response);

            }).catch(function (err, status) {
                alert(JSON.stringify(err + ' - ' + status));
                _logOut();
                deferred.reject(err);
            });

            return deferred.promise;
        };

        var _logOut = function () {
            localStorage.clear();
            localStorageService.remove('authorizationData');
            _authentication.isAuth = false;
            _authentication.userName = "";

        };

        var _fillAuthData = function () {
            var authData = localStorageService.get('authorizationData');
            if (authData)
            {
                _authentication.isAuth = true;
                _authentication.userName = authData.userName;
            }
        }

        authServiceFactory.saveRegistration = _saveRegistration;
        authServiceFactory.login = _login;
        authServiceFactory.logOut = _logOut;
        authServiceFactory.fillAuthData = _fillAuthData;
        authServiceFactory.authentication = _authentication;

        return authServiceFactory;
    }
]);