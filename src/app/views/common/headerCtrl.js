(function () {
    "use:strict";
    angular.module("myApp").controller("HeaderCtrl", ["$scope", "$localStorage", "$location", "$state", HeaderCtrl]);
    function HeaderCtrl($scope, $localStorage, $location, $state)
    {

        var hdr = this;
        hdr.header = {};
        $scope.toggleMenu = function ()
        {
            if (angular.element(document.getElementById('main-menu')).hasClass('menuCollapsed'))
            {
                document.getElementById("main-menu").classList.remove('menuCollapsed');
                document.getElementById("content-block").classList.remove('fullWidthContent');
            } else
            {
                document.getElementById("main-menu").classList.add('menuCollapsed');
                document.getElementById("content-block").classList.add('fullWidthContent');
            }

        }

        if ($localStorage.userDetails != null)
        {         
            $scope.userDetailsForProfile = $localStorage.userDetails;
            $scope.firstName = $scope.userDetailsForProfile.firstName;
            $scope.firstNameWithFirstLetter = $scope.firstName.substring(0, 1);
            $scope.lastName = $scope.userDetailsForProfile.lastName
            $scope.lastNameWithLastLetter = $scope.lastName.substring(0, 1);
            $scope.fistNameWithLastName = $scope.firstNameWithFirstLetter + $scope.lastNameWithLastLetter;

            $scope.userRoles = $localStorage.userRoles;
            if ($scope.userRoles.name == 'Admin' || $scope.userRoles.name == 'VO Customer Personnel') {
                $scope.practiceName = "Visionary Optics";
                $scope.role = $scope.userRoles.name;
            }
            else {

            }
            
        } else {
            $location.path('/login');
        }
       
        $scope.logOut = function () {
            localStorage.clear();
            $localStorage.IsAdmin = false;
            localStorageService.remove('authorizationData');
            authService.logOut();
            $state.go('login');
        }
    }
})();




