ttoApp.controller('userCourseItemCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, $filter) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 1;
 	$rootScope.backUrl  = $rootScope.url;
 	$rootScope.url = 'user-course-item/' + $routeParams.userCourseId;
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = 'user-course';
	$rootScope.selectedTab = 0;
 	$rootScope.component = {};
 	$rootScope.component.addUserCourseItem = true;
	$rootScope.isLoading = 0;

	$scope.learnCourseItemList = {};
	$scope.startCourseItemList = {};
	$scope.doneCourseItemList = {};
	$scope.limitStart = 5;
	$scope.limitDone = 5;

	// Event from rootScope view
	$scope.$on('addUserCourseItem', function(event) {
		$rootScope.goRoute('add-user-course-item/' + $routeParams.userCourseId, 'keep');
	});

	$scope.loadMoreStart = loadMoreStart;
	$scope.loadMoreDone  = loadMoreDone;

 	userCourseItemInit();
 	
 	function userCourseItemInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
	 	var userCourseId = $routeParams.userCourseId;

		$rootScope.isLoading++;
	  Restangular.one('usercourseitem/itemlist/'+userId, userCourseId).get({}, headerObj)
  	.then(function (data) {
  		if (data.length > 0) {
			 	$scope.learnCourseItemList = $filter('filter')(data, { itemGroupId: 2 });
			 	$rootScope.countLearn = $filter('filter')(data, { itemGroupId: 2, status: 'start' }).length;
			 	$scope.startCourseItemList = $filter('filter')(data, { itemGroupId: 1, status: 'start' });
			 	$rootScope.countStart = $scope.startCourseItemList.length;
			 	$scope.doneCourseItemList = $filter('filter')(data, { itemGroupId: 1, status: 'done' });
			 	$rootScope.countDone = $scope.doneCourseItemList.length;
			 	
			 	if ($rootScope.countLearn > 0) {
			 		$rootScope.selectedTab = 0;
			 	} else {
			 		if ($rootScope.countStart > 0) {
			 			$rootScope.selectedTab = 1;
			 		} else {
			 			$rootScope.selectedTab = 2;
			 		}
			 	}
  		}
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});
 	}
 	
	function loadMoreStart() {
		$scope.limitStart = $scope.limitStart + 5;
	}

	function loadMoreDone() {
		$scope.limitDone = $scope.limitDone + 5;
	}

}
]);