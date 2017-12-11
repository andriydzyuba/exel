angular.module('exel').factory('currencyService', ['$http', '$q', '$modal', function($http, $q, $modal) {
     
    var currencyService = {};
    


    _createCurrency = function(currency) {
    	var defer = $q.defer();
    	$http.post('api/currency/createCurrency.php', currency).success(function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }

	_getCurrency = function(id) {
		var defer = $q.defer();
		$http.post('api/currency/getCurrency.php', id).success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_getAllCurrency = function(id) {
		var defer = $q.defer();
		$http.post('api/currency/getAllCurrency.php', id).success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_editCurrency = function(currency) {
		var defer = $q.defer();
		$http.post('api/currency/editCurrency.php', currency).success(function(data){
			defer.resolve(data);
		});
		return defer.promise;
	}


	
	currencyService.createCurrency = _createCurrency;
	currencyService.getCurrency = _getCurrency;
	currencyService.getAllCurrency = _getAllCurrency;
	currencyService.editCurrency = _editCurrency;
	
    return currencyService;
}]);