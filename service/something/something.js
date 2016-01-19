ttoApp.factory('Something', function($resource, $rootScope) {
  return $resource('../api/test/something/:id', {}, {
		query: {
					method: 'GET',
					isArray:true,
					headers: {
						'token': $rootScope.token
					}
		},	
		get: {
					method: 'GET',
					headers: {
						'token': $rootScope.token
					}
		},	
		save: {
					method: 'POST',
					headers: {
						'token': $rootScope.token
					}
		},
		update: {
					method: 'POST',
					headers: {
						'token': $rootScope.token,
						'X-HTTP-Method-Override' : 'PUT'
					}
		}	
	}); // Note the full endpoint address
	
});