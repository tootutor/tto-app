ttoApp.factory('ItemServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/item/:itemId', {itemId: '@itemId'}, {
    query: {
      method: 'GET',
      isArray: true,
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