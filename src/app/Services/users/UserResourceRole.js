(function () {
    "use strict";
    angular.module("common.services")
        .factory("userResourceRole",
        ["$resource", "appSettings", userResourceRole]);
    function userResourceRole($resource, appSettings) {
        return $resource(appSettings.serverPath + "api/roles/", { id: "@id" },
                {
                    'getCurrentUserRole':
                        {
                            method: 'GET',
                            isArray: false,
                            url: appSettings.serverPath + 'api/roles/getuserrole'
                        },
                })
    }
}())