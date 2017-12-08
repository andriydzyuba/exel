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


.controller('ProductsController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', 'catService', function($scope, $location, $state, $stateParams, productsService, modalsService, catService) {
    console.log("xx")
    productsService.getProduct($stateParams.productId).then(function(data){
        $scope.product = data;
        console.log($scope.product);
    })

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