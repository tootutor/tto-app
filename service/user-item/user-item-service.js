ttoApp.factory('UserItemServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/item/user/:userId', {userId: '@userId'}, {
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