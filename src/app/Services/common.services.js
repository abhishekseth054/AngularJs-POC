(function () {
    "use strict";
    var app = angular.module("common.services", ["ngResource"])
    .constant("appSettings",
        {
          
         serverPath: "http://127.0.0.1:5000/"
          
        });
}())