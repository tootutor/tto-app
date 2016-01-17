ttoApp.controller('userCategoryCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.url = 'user-category';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
 	$rootScope.component.addCourse = true;

	$rootScope.isLoading = 0;
	$scope.isNoData = false;

 	userCategoryCtrlInit();
 	
 	function userCategoryCtrlInit() {
		var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
		$rootScope.isLoading++;
		Restangular.one('category/user',userId).get({}, $rootScope.headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$scope.allCategory = data;
			} else {
				$scope.isNoData = true;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

}]);