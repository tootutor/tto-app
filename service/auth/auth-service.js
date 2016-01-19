ttoApp.factory('AuthServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/auth/:userId', {}, {
		get: {
					method: 'GET',
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
		},
		remove: {
					method: 'POST',
					headers: {
						'token': $rootScope.token,
						'X-HTTP-Method-Override' : 'DELETE'
					}
		}	
	}); // Note the full endpoint address
	
});