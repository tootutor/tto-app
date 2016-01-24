ttoApp.factory('CategoryServ', function($resource) {
  return $resource(appInfo.apiPath + '/category/:categoryId', {}, {
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