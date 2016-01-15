ttoApp.controller('userCourseSectionCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, $filter) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.url = 'user-course-section/' + $routeParams.courseId;
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = $rootScope.url;
 	$rootScope.component = {};

	$rootScope.isLoading = 0;

 	userCourseSectionCtrlInit();
 	
 	function userCourseSectionCtrlInit() {
		var userId = $rootScope.userId;
	 	var courseId = $routeParams.courseId;
		$rootScope.isLoading++;
		Restangular.one('usercourseitem/coursesection/'+userId, courseId).get({}, $rootScope.headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$scope.courseSectionList = data;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

}]);