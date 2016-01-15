ttoApp.controller('userCourseAdminCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course Admin';
	$rootScope.showTab = 0;
 	$rootScope.url = 'user-course-admin';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};

	$rootScope.isLoading = 0;

 	userCourseAdminCtrlInit();
 	
 	function userCourseAdminCtrlInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
		var headerObj = {'token' : token};
		$rootScope.isLoading++;
		Restangular.all('user/alluser').getList({}, headerObj)
		.then(function (data) {
			$scope.allUser = data;
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
		$rootScope.isLoading++;
		Restangular.all('usercourse/allusercourse').getList({}, headerObj)
		.then(function (data) {
			$scope.allUserCourse = data;
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

}
]);