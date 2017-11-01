'use strict';

angular.module('exel')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

        .state('products', {
            url:'/products/:productId',
            templateUrl: 'products/product.html',
            controller: 'ProductsController'
        })
}])


.controller('ProductsController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', function($scope, $location, $state, $stateParams, productsService, modalsService) {
    console.log("xx")
    productsService.getProduct($stateParams.productId).then(function(data){
        $scope.product = data;
        console.log($scope.product);
    })

    productsService.getProducts().then(function(data){
        $scope.products = data.reverse();
    })

    $scope.callModal = function () {
        modalsService.openModal();
    }

    $scope.callOrderModal = function () {
        if (!$scope.product) { return false; }

        modalsService.openOrderModal($scope.product.id);
    }

}]) 