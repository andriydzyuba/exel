angular.module('exel').factory('ordersService', ['$http', '$q', '$modal', function($http, $q, $modal) {
     
    var ordersService = {};
    var defer;


    _createOrder = function(order) {
    	defer = $q.defer();
    	$http.post('api/orders/createOrder.php', order).success(function(data){
            defer.resolve(data);
        });
        return defer.promise;
    }
  	
    _getOrder = function(id) {
		var defer = $q.defer();
		$http.post('api/orders/getOrder.php', id).success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};

	_getOrders = function() {
		defer = $q.defer();
		$http.get('api/orders/getOrders.php').success(function(data){
	        defer.resolve(data);
	    });
	    return defer.promise;
	};


	_deleteOrder = function(id) {
		defer = $q.defer();
		$http.post('api/orders/deleteOrder.php', id).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};



	ordersService.createOrder = _createOrder;
	ordersService.getOrder = _getOrder;
	ordersService.getOrders = _getOrders;
	ordersService.deleteOrder = _deleteOrder;
	
	
	
    return ordersService;
}]); 