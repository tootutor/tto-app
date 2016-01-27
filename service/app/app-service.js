ttoApp.factory('AppServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/app'); // Note the full endpoint address
});