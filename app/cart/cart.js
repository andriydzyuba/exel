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

.controller('CartController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', 'catService', 'ordersService', 'currencyService', '$rootScope', function($scope, $location, $state, $stateParams, productsService, modalsService, catService, ordersService, currencyService, $rootScope) {

    $scope.carts=[]; //create a variable name carts, this will be the storage of the product that the buyer choose
         //this is an array of product that will be display in the mark uo
    currencyService.getCurrency(1).then(function(data){
            $scope.currency = data;
            console.log($scope.currency);
    })

        $scope.add_cart = function(product){ //set a function name add_cart
            if(product){ //check if the product is already declared within the function
                $scope.carts.push({id: product.id, title: product.title, price: product.price}); //pushes the chosen product into a new variable called carts when the add to cart button is clicked
                $scope.save_cart();
            }
        }

        $scope.total = 0; //display the default value of total

        $scope.setTotals = function(cart){ //set a function name setTotals
            if(cart){ //check if cart is already set in the function
                $scope.total += +cart.price; //sum the total value of each product
            }
            $scope.save_cart();
        }

        $scope.remove_cart = function(cart){ //set a function called remove_cart
            if(cart){ //checked if the cart has a value
                $rootScope.cartclass = null;
                $scope.carts.splice($scope.carts.indexOf(cart), 1); //delete a product based on the index
                $scope.total -= cart.price; //deduct the price of the product  simultaneously when deleted
                $scope.save_cart();
            }
        }

        $scope.save_cart = function(){
                localStorage.setItem("shoppingCarts", JSON.stringify($scope.carts));
                $scope.order = {
                    cart: JSON.stringify($scope.carts)
                };
                console.log($scope.order);
        }

    $scope.shoppingCarts = JSON.parse(localStorage.getItem("shoppingCarts")) ;
        if ($scope.shoppingCarts) {
            for (var i =0; i < $scope.shoppingCarts.length; i++) {
                $scope.carts.push($scope.shoppingCarts[i]);
            }
        }

    //console.log($scope.order);
    $scope.createOrder = function(order) {
        ordersService.createOrder($scope.order).then(function(data){
            $scope.isOrderSubmitted = true;
            localStorage.clear();
        })

    }

    $scope.closeCart = function() {
        $location.path('/main')
        $rootScope.cartclass = null;
    }


}])

//localStorage.setItem("username","George");
  //  localStorage.clear(); //очищає повністю
  //  localStorage.removeItem("username","George");
