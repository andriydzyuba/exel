angular.module('exel').factory('productsService', ['$http', '$q', '$modal', function($http, $q, $modal, Cropper) {
     
    var productsService = {};


    _createProduct = function(product) {
    	var defer = $q.defer();
    	console.log("dd");
    	$http.post('api/products/createProduct.php', product).success(function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
	_getProducts = function(params) {
		var defer = $q.defer();
		$http.post('api/products/getProducts.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_getProduct = function(id) {
		var defer = $q.defer();
		$http.post('api/products/getProduct.php', id).success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_editProduct = function(product) {
		var defer = $q.defer();
		$http.post('api/products/editProduct.php', product).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}

	_deleteProduct = function(id) {
		var defer = $q.defer();
		$http.post('api/products/deleteProduct.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_getListByCategoryId = function(id) {
		var defer = $q.defer();
		$http.post('api/products/getProductsByCategoryId.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};
	
	_getListBySubCategoryId = function(params) {
		var defer = $q.defer();
		$http.post('api/products/getProductsBySubCategoryId.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_getListBySsubCategoryId = function(params) {
		var defer = $q.defer();
		$http.post('api/products/getProductsBySsubCategoryId.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	}; 

	_searchProduct = function(params) {
		var defer = $q.defer();
		$http.post('api/products/searchProduct.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};
	



	productsService.createProduct = _createProduct;
	productsService.getProducts = _getProducts;
	productsService.getProduct = _getProduct;
	productsService.editProduct = _editProduct;
	productsService.deleteProduct = _deleteProduct;
	productsService.getListByCategoryId = _getListByCategoryId;
	productsService.getListBySubCategoryId = _getListBySubCategoryId;
	productsService.getListBySsubCategoryId = _getListBySsubCategoryId;
	productsService.searchProduct = _searchProduct;
	
    return productsService;
}]);