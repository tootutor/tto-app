ttoApp.factory('BankServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/bank', {}, {
		query: {
					method: 'GET',
					isArray:true,
		}	
	}); // Note the full endpoint address
	
});