(function () {
    "use:strict";
    angular.module("myApp").controller("SidebarCtrl", ["$scope", "$localStorage", SidebarCtrl]);

    function SidebarCtrl($scope, $localStorage) {
        var sd = this;
       // alert("helloo")
        $scope.IsAdmin = $localStorage.IsAdmin;
       // console.log("aaaa" + angular.toJson($scope.IsAdmin))
    }
    //$(document).load(function () {
    //    var winHeight = $(window).height();
    //    $('sidebarNav.nano').css('height',($(window).height()) - 64);
    //});
    //$(window).resize(function () {
    //    $('sidebarNav.nano').css('height',($(window).height()) - 64);
    //});

   

})();



