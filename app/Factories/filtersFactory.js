angular.module('exel').factory('filtersService', ['$http', '$q', '$modal', function($http, $q, $modal) {
     
    var filtersService = {};  

    _createMaker = function(maker) {
    	var defer = $q.defer();
    	console.log("dd");
    	$http.post('api/filters/createMaker.php', maker).success(function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
	
	_getMakers = function(params) {
		var defer = $q.defer();
		$http.post('api/filters/getMakers.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_getMaker = function(id) {
		var defer = $q.defer();
		$http.post('api/filters/getMaker.php', id).success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_editMaker = function(product) {
		var defer = $q.defer();
		$http.post('api/filters/editMaker.php', maker).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}

	_deleteMaker = function(id) {
		var defer = $q.defer();
		$http.post('api/filters/deleteMaker.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_getListBySubCategoryId = function(params) {
		var defer = $q.defer();
		$http.post('api/filters/getMakersBySubCategoryId.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_getListBySsubCategoryId = function(params) {
		var defer = $q.defer();
		$http.post('api/filters/getMakersBySsubCategoryId.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	}; 



	filtersService.createMaker = _createMaker;
	filtersService.getMakers = _getMakers;
	filtersService.getMaker = _getMaker;
	filtersService.editMaker = _editMaker;
	filtersService.deleteMaker = _deleteMaker;
	filtersService.getListBySubCategoryId = _getListBySubCategoryId;
	filtersService.getListBySsubCategoryId = _getListBySsubCategoryId;
	
    return filtersService;
}]);