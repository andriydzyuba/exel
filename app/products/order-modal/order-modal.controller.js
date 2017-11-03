'use strict';

angular.module('exel')




.controller('OrderModalController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', 'productId', 'ordersService', '$modalStack',
             function($scope, $location, $state, $stateParams, productsService, modalsService, productId, ordersService, $modalStack) {

    productsService.getProduct(productId).then(function(data){
        $scope.product = data;
        $scope.order = {
        	product_id: $scope.product.id
        };
    })


    $scope.createOrder = function(order) {
    	console.log($scope.order);
        $modalStack.dismissAll();
        ordersService.createOrder($scope.order).then(function(data){

        })
    }

}])
