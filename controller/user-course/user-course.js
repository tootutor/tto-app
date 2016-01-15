ttoApp.controller('userCourseCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
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
		var userId = $rootScope.userId;
		$rootScope.isLoading++;
		Restangular.one('usercourse/usercourselist',userId).get({}, $rootScope.headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$scope.userCourseList = data;
			} else {
				$scope.isNoData = true;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

}]);