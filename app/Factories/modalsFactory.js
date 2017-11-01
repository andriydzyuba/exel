angular.module('exel').factory('modalsService', ['$http', '$q', '$modal', function($http, $q, $modal) {
     
    var modalsService = {};
    

    var defer;
  
	_openModal = function() {
		defer = $q.defer();
		
			$modal.open({
				templateUrl: 'modals/sendMail.html',
				// controller: 'ConfirmController',
				size: 'lg',    
				// resolve: {
				// 	message: function (){
				// 		return _message;
				// 	}
				// }    
			})
		
		return defer.promise;
	};


	_openOrderModal = function(productId) { 
		defer = $q.defer();
		
			$modal.open({
				templateUrl: 'products/order-modal/order-modal.html',
				controller: 'OrderModalController',
				size: 'md',    
				resolve: {
					productId: function() { return productId; }			
				}    
			})
		
		return defer.promise;
	};

 
	_confirmResolve = function(answer) {
			defer.resolve(answer);
	}

	modalsService.openModal = _openModal;
	modalsService.openOrderModal = _openOrderModal;
	// confirmService.confirmResolve = _confirmResolve;

    return modalsService;
}]);