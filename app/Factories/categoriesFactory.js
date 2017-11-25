angular.module('exel').factory('catService', ['$http', '$q', '$modal', 'Cropper', function($http, $q, $modal, Cropper) {
     
    var catService = {};
    var defer;


    _createCat = function(category) {
    	defer = $q.defer();
    	$http.post('api/categories/createCat.php', category).success(function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
  
	_getCats = function() {
		defer = $q.defer();
		$http.get('api/categories/getCats.php').success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_getSubcat = function(id) {
		var defer = $q.defer();
		$http.post('api/categories/getSubcat.php', id).success(function(data){
	        defer.resolve(data);
	       
	    });
	    return defer.promise;
	};

	_getSsubcat = function(id) {
		var defer = $q.defer();
		$http.post('api/categories/getSsubcat.php', id).success(function(data){
	        defer.resolve(data);
	       
	    });
	    return defer.promise;
	};

	_deleteCat = function(id) {
		defer = $q.defer();
		$http.post('api/categories/deleteCat.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_createSubcat = function(subcat) {
		defer = $q.defer();
		$http.post('api/categories/createSubcat.php', subcat).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}

	_createSsubcat = function(ssubcat) {
		defer = $q.defer();
		$http.post('api/categories/createSsubcat.php', ssubcat).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}

	_editSubcat = function(subcat) {
		defer = $q.defer();
		$http.post('api/categories/editSubcat.php', subcat).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}

	_editSsubcat = function(ssubcat) {
		defer = $q.defer();
		$http.post('api/categories/editSsubcat.php', ssubcat).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}

	_deleteSubcat = function(id) {
		defer = $q.defer();
		$http.post('api/categories/deleteSubcat.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	}

	_deleteSsubcat = function(id) {
		defer = $q.defer();
		$http.post('api/categories/deleteSsubcat.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	}


	catService.createCat = _createCat;
	catService.getCats = _getCats;
	catService.getSubcat = _getSubcat;
	catService.getSsubcat = _getSsubcat;
	catService.deleteCategory = _deleteCat;
	catService.createSubcat = _createSubcat;
	catService.createSsubcat = _createSsubcat;
	catService.editSubсat = _editSubcat;
	catService.editSsubсat = _editSsubcat;
	catService.deleteSubcat = _deleteSubcat;
	catService.deleteSsubcat = _deleteSsubcat;
	
	
    return catService;
}]);