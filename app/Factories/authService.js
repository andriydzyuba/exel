'use strict';

angular.module('exel')

.factory('authService', ['$http', '$state', '$q', '$injector', '$location', function($http, $state, $q, $injector, $location) { 
	var authService = {};

	var _authentication = {
		isAuth: false
	}

	var _setAuth = function(authData) {
		_authentication.isAuth = true;
	}

	var _signIn = function(username, password) {
		var deffered = $q.defer();
		var result = {};
		var user = {};
		user.name = username;
		user.password = password;


		$http.post('api/login.php', user).success(function(data){
			console.log(data)
			if (data) {
				sessionStorage.setItem( 'authData', true ) ;
				_authentication.isAuth = true;
				deffered.resolve(data);
			} 
		})
		
		return deffered.promise	
	}

	var _checkAuthentication = function(event, toState) {
        var authData = JSON.parse( sessionStorage.getItem('authData') );
        
        if (!authData && toState.dashboard) {
        	event.preventDefault();
            $state.go('login');
        }
    }


    var _signOut = function() {
    	localStorage.removeItem('authData');
    	_authentication.isAuth = false;
    	_authentication.id = "";
    }

    
    authService.authentication = _authentication;
	authService.signIn = _signIn;
	authService.signOut = _signOut;
	authService.checkAuthentication = _checkAuthentication;

    return authService;

}])