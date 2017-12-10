'use strict';

// Declare app level module which depends on views, and components
angular.module('exel', [
  'ngRoute',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'summernote',
  'uiGmapgoogle-maps',
  'ngCropper',
  'infinite-scroll',
  'exel.CONFIG',
  'exel.main',
  'exel.about',
  'exel.contacts',
])
.config(['$routeProvider', '$urlRouterProvider', function($routeProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/main");
}])

.run(['$rootScope', '$state', '$stateParams', 'authService', function ($rootScope, $state, $stateParams, authService) {

    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.user = null;
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      authService.checkAuthentication(event, toState);
    });
}]);
