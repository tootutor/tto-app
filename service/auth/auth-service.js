ttoApp.factory('AuthServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/auth', {}, {
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