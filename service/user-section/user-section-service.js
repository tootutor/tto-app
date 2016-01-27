ttoApp.factory('UserSectionServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/section/user/:userId', {userId: '@userId'}, {
		query: {
					method: 'GET',
					isArray:true,
		},
		update: {
					method: 'POST',
					headers: {
						'X-HTTP-Method-Override' : 'PUT'
					}
		},
		remove: {
					method: 'POST',
					headers: {
						'X-HTTP-Method-Override' : 'DELETE'
					}
		}	
	}); // Note the full endpoint address
	
});