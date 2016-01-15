ttoApp.controller('addUserCourseItemCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.backUrl  = $rootScope.url;
 	$rootScope.url = 'add-user-course-item/' + $routeParams.userCourseId;
	$rootScope.selectedTab = 0;
 	$rootScope.component = {};
	$rootScope.isLoading = 0;

	$scope.isNoNewData = false;
	$scope.newCourseItemList = {};
	$scope.startCourseItemList = {};
	$scope.limitNew = 5;

	$scope.loadMoreNew       = loadMoreNew;
	$scope.addUserCourseItem = addUserCourseItem;

 	addUserCourseItemInit();
 	
 	function addUserCourseItemInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
	 	var userCourseId = $routeParams.userCourseId;

		$rootScope.isLoading++;
	  Restangular.one('usercourseitem/newitemlist/'+userId, userCourseId).get({}, headerObj)
  	.then(function (data) {
  		if (data.length > 0) {
				$scope.newCourseItemList = data;
  		} else {
  			$scope.isNoNewData = true;
  		}
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});
 	}
 	
 	function addUserCourseItem(newCourseItem) {
 		$scope.loadTarget++;
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
	 	var userCourseId = $routeParams.userCourseId;
	 	var postObj = {
	 		userId       : userId, 
	 		userCourseId : userCourseId, 
	 		courseItemId : newCourseItem.courseItemId,
	 		actionCount  : newCourseItem.actionCount
	 	};

		$rootScope.isLoading++;
	  Restangular.all('usercourseitem/newitem').post(postObj, {}, headerObj)
  	.then(function (data) {
			$rootScope.goRoute('user-course-item-detail/' + data.userCourseItemId, 'skip');
			$rootScope.isLoading--;
  	}, function (response) {
 			$rootScope.errorDialog(response, 'Update Error !!!');
 	});
 	}

	function loadMoreNew() {
		$scope.limitNew = $scope.limitNew + 5;
	}

}]);