ttoApp.controller('userCourseCtrl', ['$scope', '$rootScope', '$routeParams', 'UserCourseServ',
function ($scope, $rootScope, $routeParams, UserCourseServ) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.url = 'user-course';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
 	$rootScope.component.addCourse = true;

	$rootScope.isLoading = 0;
	$scope.isNoData = false;

 	userCourseCtrlInit();
 	
 	function userCourseCtrlInit() {
    var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
		$rootScope.isLoading++;
    $scope.userCourseList = UserCourseServ.query({userId: userId, categoryId: $routeParams.categoryId}, function (data) {
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

}]);