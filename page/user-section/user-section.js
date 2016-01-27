ttoApp.controller('userSectionCtrl', ['$scope', '$rootScope', '$routeParams', 'UserSectionServ',
function ($scope, $rootScope, $routeParams, UserSectionServ) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.url = 'user-course';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};

	$rootScope.isLoading = 0;
	$scope.isNoData = false;

 	userCourseCtrlInit();
 	
 	function userCourseCtrlInit() {
    var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
		$rootScope.isLoading++;
    $scope.userCourseList = UserSectionServ.query({userId: userId, categoryId: $routeParams.categoryId}, function (data) {
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

}]);