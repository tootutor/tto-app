ttoApp.factory('ApiServ', function($resource) {
  var methodParm = {
        query: {method: 'GET', isArray: true},
        update: {method: 'POST', headers: {'X-HTTP-Method-Override' : 'PUT'} },
        remove: {method: 'POST', headers: {'X-HTTP-Method-Override' : 'DELETE' } } 
      };
      
  return  {
    App: $resource(appInfo.apiPath + '/app'),
    Auth: $resource(appInfo.apiPath + '/auth/:userId', {userId: '@userId'}, methodParm),
    Bank: $resource(appInfo.apiPath + '/bank', {}, methodParm),
    Category: $resource(appInfo.apiPath + '/category/:categoryId', {}, methodParm),
    Coin: $resource(appInfo.apiPath + '/coin', {}, methodParm),
    Course: $resource(appInfo.apiPath + '/course/:courseId', {courseId : '@courseId'}, methodParm),
    Item: $resource(appInfo.apiPath + '/item/:itemId', {itemId: '@itemId'}, methodParm),
    Order: $resource(appInfo.apiPath + '/order/:orderId/user/:userId', {orderId: '@orderId', userId: '@userId'}, methodParm),
    Section: $resource(appInfo.apiPath + '/section/:sectionId', {sectionId: '@sectionId'}, methodParm),
    Task: $resource(appInfo.apiPath + '/task/:taskId', {taskId: '@taskId'}, methodParm),
    User: $resource(appInfo.apiPath + '/user/:userId' , {}, methodParm),
    UserCategory: $resource(appInfo.apiPath + '/category/user/:userId', {}, methodParm),
    UserCoin: $resource(appInfo.apiPath + '/coin/user/:userId', {userId: '@userId'}, methodParm),
    UserCourse: $resource(appInfo.apiPath + '/course/:courseId/user/:userId', {userId: '@userId', courseId: '@courseId'}, methodParm),
    UserItem: $resource(appInfo.apiPath + '/item/:itemId/user/:userId', {itemId: '@itemId', userId: '@userId'}, methodParm),
    UserOrder: $resource(appInfo.apiPath + '/order/:orderId/user/:userId', {orderId: '@orderId'}, methodParm),
    UserSection: $resource(appInfo.apiPath + '/section/:sectionId/user/:userId', {userId: '@userId', sectionId: '@sectionId'}, methodParm),
    UserTask: $resource(appInfo.apiPath + '/task/:taskId/user/:userId', {userId: '@userId' ,taskId: '@taskId'}, methodParm)
  };
  
});