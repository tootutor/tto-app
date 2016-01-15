ttoApp.controller('userItemDetailCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', '$filter', 
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, $filter) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.backUrl  = $rootScope.url;
 	$rootScope.url = 'user-item-detail/' + $routeParams.courseItemId;
 	$rootScope.showBack = true;
 	$rootScope.component = {};
	$rootScope.isLoading = 0;

	$scope.courseItemId = $routeParams.courseItemId;
	$scope.isNoData = false;
	$scope.item = {};
	$scope.allComment = {};
	$scope.newMessage = '';

	$scope.processItemRadioPoint  = processItemRadioPoint;
	$scope.processItemRadio       = processItemRadio;
	$scope.processItemSelect      = processItemSelect;
	$scope.processItemSelectPoint = processItemSelectPoint;
	$scope.processItemInput       = processItemInput;
	$scope.userCourseItemDone     = userCourseItemDone;

	// Event from rootScope view
	$scope.$on('userCourseItemDone', function(event) {
		$scope.userCourseItemDone();
	});


 	userItemDetailInit();
 	
 	function userItemDetailInit() {
		var userId = $rootScope.userId;
	 	var courseItemId = $routeParams.courseItemId;

	 	$rootScope.isLoading++;
        Restangular.one('usercourseitem/courseitemdetail/'+userId, courseItemId).get({}, $rootScope.headerObj)
        .then(function (data) {
        	$scope.item = data;
        	$rootScope.component.comment = {userId: userId, content: $scope.item.content};
        	if ($scope.item.itemGroupId == 2 && $scope.item.status != 'done') {
        		$rootScope.component.userCourseItemDone = true;
        	}
        	for (var i = 0; i < $scope.item.allItemDetail.length; i++) {
        		if ($scope.item.allItemDetail[i].itemTypeId == 3) {
        			for (var j = 0; j < $scope.item.allItemDetail[i].allItemSelect.length; j++) {
        				if ($scope.item.allItemDetail[i].allItemSelect[j].userIsAnswer == 1) {
        					$scope.item.allItemDetail[i].allItemSelect[j].userIsAnswer = true;
        				} else {
        					$scope.item.allItemDetail[i].allItemSelect[j].userIsAnswer = false;
        				}
        			}
        		}
        	}
        	$rootScope.isLoading--;
        }, function (response) {
        	$rootScope.errorDialog(response, 'Loading Error !!!');
        });
 	}
 	
 	function findIndexByKey(arraytosearch, key, valuetosearch) {
		for (var i = 0; i < arraytosearch.length; i++) {
			if (arraytosearch[i][key] == valuetosearch) {
				return i;
			}
		}
		return null;
	}

	function processItemRadioPoint(itemDetail) {
		var index = findIndexByKey(itemDetail.allItemRadio, 'itemRadioId', itemDetail.userItemRadioId);		
		itemDetail.point = itemDetail.allItemRadio[index].point;
	}
	
	function processItemRadio(itemDetail) {
		$scope.item.actionCount--;
		var postObj = {
			userId           : $rootScope.userId,
			userCourseItemId : $routeParams.userCourseItemId, 
			itemDetailId     : itemDetail.itemDetailId, 
			itemRadioId      : itemDetail.userItemRadioId,
			point            : itemDetail.point,
			actionCount      : $scope.item.actionCount
		};
	  Restangular.all('usercourseitem/newitemradio').post(postObj, {}, $rootScope.headerObj)
		.then(function (data) {
			itemDetail.status = 'done';
			if ($scope.item.actionCount <= 0) {
				$scope.item.status = 'done';
			}
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}

	function processItemSelectPoint(itemDetail, itemSelect) {
		if (itemSelect.userIsAnswer) {
			itemDetail.point = Number(itemDetail.point) + Number(itemSelect.point);
		} else {
			itemDetail.point = Number(itemDetail.point) + Number(itemSelect.point);
		}
	}

	function processItemSelect(itemDetail) {
		$scope.item.actionCount--;
	 	var allItemSelect = $filter('filter')(itemDetail.allItemSelect, { userIsAnswer: true });
		var postObj = {
			userId           : $rootScope.userId,
			userCourseItemId : $routeParams.userCourseItemId, 
			itemDetailId     : itemDetail.itemDetailId, 
			point            : itemDetail.point,
			actionCount      : $scope.item.actionCount,
			allItemSelect    : allItemSelect
		};
	  Restangular.all('usercourseitem/newitemselect').post(postObj, {}, $rootScope.headerObj)
		.then(function (data) {
			itemDetail.status = 'done';			
			if ($scope.item.actionCount <= 0) {
				$scope.item.status = 'done';
			}
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}

	function processItemInput(itemDetail) {
		//Loop input list to check answer
		for (var i = 0; i < itemDetail.allItemInput.length; i++) {
			if (itemDetail.allItemInput[i].answer == itemDetail.allItemInput[i].userAnswer) {
				itemDetail.point = Number(itemDetail.point) + Number(itemDetail.allItemInput[i].point);
			}
		}
		$scope.item.actionCount--;
		var postObj = {
			userId           : $rootScope.userId,
			userCourseItemId : $routeParams.userCourseItemId, 
			itemDetailId     : itemDetail.itemDetailId, 
			point            : itemDetail.point,
			actionCount      : $scope.item.actionCount,
			allItemInput     : itemDetail.allItemInput
		};
	  Restangular.all('usercourseitem/newiteminput').post(postObj, {}, $rootScope.headerObj)
		.then(function (data) {
			itemDetail.status = 'done';			
			if ($scope.item.actionCount <= 0) {
				$scope.item.status = 'done';
			}
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}

	function userCourseItemDone() {
		var postObj = {
			userId           : $rootScope.userId,
			userCourseItemId : $routeParams.userCourseItemId 
		};
	  Restangular.all('usercourseitem/updateitemdone').post(postObj, {}, $rootScope.headerObj)
		.then(function (data) {
			$scope.item.status = 'done';
			$rootScope.component.userCourseItemDone = false;
		  var alert = $mdDialog.alert({title: 'Update completed !!!', content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}

}]);