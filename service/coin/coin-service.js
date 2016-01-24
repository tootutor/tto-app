ttoApp.factory('CoinServ', function($resource) {
  return $resource(appInfo.apiPath + '/coin', {}, {
		query: {
			method: 'GET',
			isArray: true
		}	
	}); // Note the full endpoint address
	
});