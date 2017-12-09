'use strict';

angular.module('exel')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('cart', {
            url:'/cart',
            templateUrl: 'cart/cart.html',
            controller: 'CartController'
        })
}])


.controller('CartController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', 'catService', function($scope, $location, $state, $stateParams, productsService, modalsService, catService) {
    console.log("xx")

    $scope.products = [];
    $scope.loadMore = function() {

        var params = {
        limit: 5,
        offset: $scope.products.length        
        }

        productsService.getProducts(params).then(function(response) {
                console.log(response);
            if (response) {

                for (var i =0; i < response.length; i++) {

                $scope.products.push(response[i]);

                }
            }
        })
    }
    $scope.loadMore();

    $scope.callModal = function () {
        modalsService.openModal();
    }

    $scope.callOrderModal = function () {
        if (!$scope.product) { return false; }

        modalsService.openOrderModal($scope.product.id);
    }


}]) 