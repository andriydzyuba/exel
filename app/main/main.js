'use strict';

angular.module('exel.main', ['ngRoute'])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
        .state('main', {
            url:'/main',
            templateUrl: 'main/main.html',
            controller: 'MainPageController'
        })

        .state('main.category', {
            url:'/category/:catId',
            templateUrl: 'products/category.html',
            controller: 'CategoryController'
        })

        .state('main.subcategory', {
            url:'/subcategory/:subcatId',
            templateUrl: 'products/category.html',
            controller: 'SubCategoryController'
        })

        .state('main.ssubcategory', {
            url:'/subcategory/:ssubcatId',
            templateUrl: 'products/category.html',
            controller: 'SsubCategoryController'
        })

        .state('main.product', {
            url:'/product/:id',
            templateUrl: 'product/product.html',
            controller: 'ProductController'
        })
}])

//фільтр товарів за ціною
.filter('priceLessThan', function () {
 
    return function (input, price) {
        var output = [];
        if (isNaN(price)) {
 
            output = input;
        }
        else {
            angular.forEach(input, function (item) {
 
                if (item.price < price) {
                    output.push(item)
                }
            });
        }
        return output;
    }
})

.controller('ProductController', ['$scope', '$location', '$state', '$stateParams', 'productsService', 'modalsService', function($scope, $location, $state, $stateParams, productsService, modalsService) {
    console.log("xx")
    productsService.getProduct($stateParams.productId).then(function(data){
        $scope.product = data;
    })

    productsService.getProducts().then(function(data){
        $scope.products = data.reverse();
    })

    $scope.callModal = function () {
        modalsService.openModal();
    }

}])

.controller('CategoryController', ['$scope', '$http', '$location', '$timeout', '$modal', '$stateParams', 'cropperService', '$modalStack', 'catService', 'productsService', 'confirmService', function($scope, $http, $location, $timeout, $modal, $stateParams, cropperService, $modalStack, catService, productsService, confirmService) {
    console.log('çontroller runs');
    $scope.categoryId = $stateParams.catId;
    $scope.subcatId = $stateParams.subcatId;
    $scope.subcategory = {};
    $scope.subcategory.c_id = $scope.categoryId;

    if ($scope.subcatId) {
        catService.getSubcat($scope.subcatId).then(function(data){
            $scope.subcategory = data;
        })
    }

    catService.getCats().then(function(data){
        $scope.categories = data;
        
    });

    $scope.category = {};


    productsService.getListByCategoryId($stateParams.catId).then(function(data){
        $scope.products = data;
    })

}])

.controller('SubCategoryController', ['$scope', '$http', '$location', '$timeout', '$modal', '$stateParams', 'cropperService', '$modalStack', 'catService', 'productsService', 'confirmService', function($scope, $http, $location, $timeout, $modal, $stateParams, cropperService, $modalStack, catService, productsService, confirmService) {
    console.log('çontroller runs');
    $scope.categoryId = $stateParams.catId;
    $scope.subcatId = $stateParams.subcatId;
    $scope.subcategory = {};
    $scope.subcategory.c_id = $scope.categoryId;

    if ($scope.subcatId) {
        catService.getSubcat($scope.subcatId).then(function(data){
            $scope.subcategory = data;
        })
    }

    catService.getCats().then(function(data){
        $scope.categories = data;
        
    });

    $scope.category = {};


    productsService.getListBySubCategoryId($stateParams.subcatId).then(function(data){
        $scope.products = data;
    })

}])

.controller('SsubCategoryController', ['$scope', '$http', '$location', '$timeout', '$modal', '$stateParams', 'cropperService', '$modalStack', 'catService', 'productsService', 'confirmService', function($scope, $http, $location, $timeout, $modal, $stateParams, cropperService, $modalStack, catService, productsService, confirmService) {
    console.log('çontroller runs');
    $scope.subcategoryId = $stateParams.subcatId;
    $scope.ssubcatId = $stateParams.ssubcatId;
    $scope.ssubcategory = {};
    $scope.ssubcategory.s_id = $scope.subcatId;

    if ($scope.ssubcatId) {
        catService.getSsubcat($scope.ssubcatId).then(function(data){
            $scope.ssubcategory = data;
        })
    }

    catService.getCats().then(function(data){
        $scope.categories = data;
        
    });

    $scope.category = {};


    productsService.getListBySsubCategoryId($stateParams.ssubcatId).then(function(data){
        $scope.products = data;
    })

}])



.controller('MainPageController', ['$scope', '$http', '$animate', 'newsService', 'productsService', 'catService', function($scope, $http, $animate, newsService, productsService, catService) {
$http.get('main/slides.json').success(function(data) {
      $scope.slides = data;

      var i, a = [], b;

      for (i = 0; i < $scope.slides.length; i += 6) {
        b = { image1: $scope.slides[i] };

        if ($scope.slides[i + 5]) {
          b.image2 = $scope.slides[i + 1];
          b.image3 = $scope.slides[i + 2];
          b.image4 = $scope.slides[i + 3];
          b.image5 = $scope.slides[i + 4];
          b.image6 = $scope.slides[i + 5];
        }

        a.push(b);
      }

      $scope.groupedSlides = a;

});
$animate.enabled(false);
$scope.myInterval = 6000;

productsService.getProducts().then(function(data){
  $scope.products = data.reverse();
  if ($scope.products.length > 4) {
    $scope.products = $scope.products.splice(0, 9);
  }
  //$scope.mainProduct = $scope.products.splice(0, 1)[0];
})

catService.getCats().then(function(data){
        $scope.categories = data;
        
    });

    $scope.category = {};

}]);