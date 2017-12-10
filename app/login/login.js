angular.module('exel')



.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state( 'login', {
        url: "/login",
        templateUrl: "login/login.html",
        controller: "LoginController"
	})
}])

.controller('LoginController', ['$scope', 'authService', '$location', function($scope, authService, $location) {

    $scope.user = {};

    $scope.signIn = function(user) {
        console.log('fs')
        authService.signIn(user.name, user.password).then(function(data){
            if (data) {
                $location.path('dashboard/edit/principle');
            }
        })

    }

    

}])