ttoApp.factory('UserCourseServ', function($resource, $rootScope) {
  return $resource(appInfo.apiPath + '/course/:courseId/user/:userId', {userId: '@userId', courseId: '@courseId'}, {
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