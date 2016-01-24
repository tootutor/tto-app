ttoApp.factory('UserCoinServ', function($resource) {
  return $resource(appInfo.apiPath + '/coin/user/:userId', {userId: '@userId'}, {
		query: {
			method: 'GET',
			isArray: true
		}	
	}); // Note the full endpoint address
	
});