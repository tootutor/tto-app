ttoApp.controller('addCourseItemCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $filter) {
	$rootScope.icon = 'link';
	$rootScope.title = 'Course Item';
	$rootScope.showTab = 0;
 	$rootScope.url = 'course-item';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
 	$rootScope.component.addCourseItem = true;
	$rootScope.isLoading = 0;

	$scope.isNoData = false;
	$scope.allCourse = [];
	$scope.allItem = [];

	$scope.courseItem = {courseId : 0, itemList : []};

	$scope.addCourseItem = addCourseItem;

	// Event from rootScope view
	$scope.$on('addCourseItem', function(event) {
		$scope.addCourseItem();
	});

 	addCourseItemInit();
 	
 	function addCourseItemInit() {
		//$scope.$on('addCourseITem', addCourseItem);
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};

		$rootScope.isLoading++;
		Restangular.all('course/allcategory').getList({}, headerObj)
		.then(function (data) {
			$scope.allCategory = data;
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
	 	
		$rootScope.isLoading++;
		Restangular.all('course/allcourse').getList({}, headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$scope.allCourse = data;
			} else {
				$scope.isNoData = true;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});

		$rootScope.isLoading++;
	  Restangular.all('item/allnewitem').getList({}, headerObj)
  	.then(function (data) {
  		if (data.length > 0) {
	  		$scope.allItem = data;
  		} else {
  			$scope.isNoData = true;
  		}
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});

 	}
 	
 	function addCourseItem() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
	 	$scope.courseItem.itemList = $filter('filter')($scope.allItem, { checked: true });
	 	var postObj = $scope.courseItem;

		$rootScope.isLoading++;
		Restangular.all('courseitem/newcourseitem').post(postObj, {}, headerObj)
		.then(function (data) {
			$rootScope.isLoading--;
		  var alert = $mdDialog.alert({title: 'Add Course Item Completed !!!', content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
 	}

}
]);