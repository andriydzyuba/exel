angular.module('exel').factory('ordersService', ['$http', '$q', '$modal', function($http, $q, $modal) {
     
    var ordersService = {};

    _createOrder = function(order) {
    	var defer = $q.defer();
    	console.log("dd");
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

	_getOrders = function(params) {
		var defer = $q.defer();
		$http.post('api/orders/getOrders.php', params).success(function(data){
			defer.resolve(data);
		});
		return defer.promise
	};

	_deleteOrder = function(id) {
		var defer = $q.defer();
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