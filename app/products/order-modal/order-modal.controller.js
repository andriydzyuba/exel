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

        ordersService.createOrder($scope.order).then(function(data){
            $scope.isOrderSubmitted = true;
        })
    }

    $scope.closeModal = function() {
        $modalStack.dismissAll();

    }

}])
