(function(){
  angular.module('exel')
  .controller("ApplicationController", ["$scope", "$location", "CONFIG", 'catService', 'productsService', function($scope, $location, CONFIG, catService, productsService){

  	$scope.main = CONFIG.MAIN;
    $scope.products = CONFIG.PRODUCTS;
  	$scope.about = CONFIG.ABOUT;
  	$scope.offers = CONFIG.OFFERS;
  	$scope.portfolio = CONFIG.PORTFOLIO;
  	$scope.contacts = CONFIG.CONTACTS;
     
    $scope.isActive = function (viewLocation) { 
    
        return viewLocation === $location.path().split('/')[1];
    };

    catService.getCats().then(function(data){
        $scope.categories = data;
        
    });

    $scope.lostproducts = [];

    $scope.onSelectOptionChanged = function() {
        $scope.lostproducts.length = 0;
        $scope.searchProduct();
    }
   
    $scope.searchProduct = function() {

        var params = {
        limit: 10,
        offset: $scope.lostproducts.length
        }

        if ($scope.title) {
            params.title = $scope.title
        }

        productsService.searchProduct(params).then(function(response) {
                console.log(response);
            if (response) {

                for (var i =0; i < response.length; i++) {

                $scope.lostproducts.push(response[i]);

                }
            }
        })
    }


    $scope.title = null;

    $scope.cleanFilter = function() {

        $scope.lostproducts.length = 0;
        $scope.title = null;
    }





  }]);
})(); 