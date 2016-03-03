ttoApp.factory('UserTaskServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/task/:taskId/user/:userId', {userId: '@userId' ,taskId: '@taskId'}, {
		query: {
      method: 'GET',
      isArray: true
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