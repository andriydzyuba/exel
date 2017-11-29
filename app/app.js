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
  'exel.CONFIG',
  'exel.main',
  'exel.about',
  'exel.contacts',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]);

