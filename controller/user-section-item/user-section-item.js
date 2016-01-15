ttoApp.controller('userSectionItemCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, $filter) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
 	$rootScope.backUrl  = $rootScope.url;
 	$rootScope.url = 'user-section-item/' + $routeParams.courseSectionId;
 	$rootScope.showBack = true;
 	$rootScope.component = {};
// 	$rootScope.component.addUserCourseItem = true;
	$rootScope.isLoading = 0;

 	userSectionItemInit();
 	
 	function userSectionItemInit() {
		var userId = $rootScope.userId;
	 	var courseId = $routeParams.courseId;
	 	var courseSectionId = $routeParams.courseSectionId;

		$rootScope.isLoading++;
		Restangular.one('usercourseitem/coursesectionitem/'+userId, courseSectionId).get({}, $rootScope.headerObj)
		.then(function (data) {
			if (data.length > 0) {
		$scope.sectionItemList = data;
			$rootScope.isLoading--;
			}
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}
}
]);