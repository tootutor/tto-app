ttoApp.factory('AuthServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/auth/:userId', {}, {
		get: {
      method: 'GET',
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