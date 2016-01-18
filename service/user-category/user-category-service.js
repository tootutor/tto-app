ttoApp.factory('UserCategoryServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/category/user/:userId', {}, {
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
		},
		update: {
					method: 'POST',
					headers: {
						'token': $rootScope.token,
						'X-HTTP-Method-Override' : 'DELETE'
					}
		}	
	}); // Note the full endpoint address
	
});