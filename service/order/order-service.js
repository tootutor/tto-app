ttoApp.factory('OrderServ', function($resource) {
  return $resource(appInfo.apiPath + '/order/:orderId/user/:userId', {orderId: '@orderId', userId: '@userId'}, {
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