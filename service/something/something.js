ttoApp.factory('Something', function($resource, $rootScope) {
  return $resource('../api/test/something/:id', {}, {
		get: {
					method: 'GET',
					headers: $rootScope.headerObj
		},	
		save: {
					method: 'POST',
					headers: $rootScope.headerObj
		}	
	}); // Note the full endpoint address
	
});