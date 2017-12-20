'use strict';

angular.module('exel')


.controller('OrderModalController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', 'productId', 'ordersService', '$modalStack', 'currencyService',
             function($scope, $location, $state, $stateParams, productsService, modalsService, productId, ordersService, $modalStack, currencyService) {


    currencyService.getCurrency(1).then(function(data){
            $scope.currency = data;
            console.log($scope.currency);
    })

    productsService.getProduct(productId).then(function(data){
        $scope.product = data;
        $scope.carts=[];
        $scope.carts.push({id: $scope.product.id, title: $scope.product.title, price: $scope.product.price, image: $scope.product.image});
        $scope.order = {
                    cart: JSON.stringify($scope.carts)
                };
        console.log($scope.order);

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
