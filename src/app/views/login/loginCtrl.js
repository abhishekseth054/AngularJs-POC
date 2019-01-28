
"use:strict";
myApp.controller("loginCtrl", ["$scope", "$state", "authService", "$location", "$localStorage", "userResource", "userResourceRole",

    function ($scope, $state, authService, $location, $localStorage, userResource, userResourceRole) {
        var lg = this;

        lg.loginInfo = {};

        $scope.loader = false;

        $scope.login = function () {
            $scope.loader = true;
            authService.login(lg.loginInfo).then(function (response) {
                // console.log(JSON.stringify(response));
                localStorage.setItem("loginSuccess", true);

                userResource.getUserDetailsbyId(function (userData) {

                    $localStorage.userDetails = userData;

                    userResourceRole.getCurrentUserRole(function (userRole) {

                        // toaster.success("Login Successfull ")
                        $localStorage.userRoles = userRole;

                        //admin Views
                        if (userRole.name == 'Admin') {
                            $scope.IsAdmin = true;
                            $localStorage.IsAdmin = $scope.IsAdmin;
                        }

                        if (userData.isProfileUpdated) {
                            $location.path('/dashboard');
                        }
                        else {
                            $location.path('/profile');
                        }
                    }, function (err) {

                        $scope.showError = true;
                        $scope.loader = false;
                        $scope.message = "Please enter valid login details."
                        toaster.error("Please enter valid login details.");
                    });

                }, function (err) {

                    $scope.showError = true;
                    $scope.loader = false;
                    $scope.message = "Please enter valid login details."
                    toaster.error("Please enter valid login details.");
                });
            }, function (err) {

                $scope.showError = true;
                $scope.loader = false;
                $scope.message = "Please enter valid login details."
                toaster.error("Please enter valid login details.");
            });
        };

        //added by suneel
        if (authService.authentication.isAuth == true) {
            $state.go("dashboard");
        } else {
            $state.go("login");
        }
    }

]);