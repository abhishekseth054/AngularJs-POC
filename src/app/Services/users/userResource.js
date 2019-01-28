(function () {
    "use strict";
    angular.module("common.services")
        .factory("userResource",
        ["$resource", "appSettings", userResource]);
    function userResource($resource, appSettings) {
        return $resource(appSettings.serverPath + "auth/status", { id: "@id" },
                {

                    'getUserDetailsbyId':
                        {
                            method: 'GET',
                            isArray: false,
                            url: appSettings.serverPath + 'auth/status'
                        },
                })
    }
}())