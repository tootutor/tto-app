ttoApp.controller('userCourseItemDetailCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, $filter) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.backUrl  = $rootScope.url;
 	$rootScope.url = 'user-course-item-detail/' + $routeParams.userCourseItemId;
 	$rootScope.showBack = true;
 	$rootScope.component = {};
	$rootScope.isLoading = 0;

	$scope.userCourseItemId = $routeParams.userCourseItemId;
	$scope.isNoData = false;
	$scope.item = {};
	$scope.allComment = {};
	$scope.newMessage = '';

	$scope.addNewComment          = addNewComment;
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


 	userCourseItemDetailInit();
 	
 	function userCourseItemDetailInit() {
		var userId = $rootScope.userId;
	 	var userCourseItemId = $routeParams.userCourseItemId;

	 	$rootScope.isLoading++;
	  Restangular.one('usercourseitem/itemdetail/'+userId, userCourseItemId).get({}, $rootScope.headerObj)
		.then(function (data) {
			$scope.item = data;
			$rootScope.component.comment = {userId: userId, userCourseItemId: userCourseItemId, content: $scope.item.content};
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

	function addNewComment() {
	 	var userCourseItemId = $routeParams.userCourseItemId;
		var postObj = {};

		if ($rootScope.role == 'admin') {
			postObj = {
				userId     : $scope.item.userId,
				routeUrl   : 'user-course-item-detail/' + $routeParams.userCourseItemId,
				fromUserId : $rootScope.userId,
				content    : $scope.item.content + "\n - _Too.Tutor : " + $scope.newMessage + "_"
			};
		} else {
			postObj = {
				userId     : 1,
				routeUrl   : 'user-course-item-detail-admin/' + $rootScope.userId + '/' + $routeParams.userCourseItemId,
				fromUserId : $rootScope.userId,
				content    : $scope.item.content + '\n - _' + $rootScope.nickname + ' : ' + $scope.newMessage + "_"
			};
		}
	  Restangular.all('notification/newnotification').post(postObj, {}, $rootScope.headerObj)
		.then(function (data) {
			console.log('added notification');
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});

		var newComment = {
			userCourseItemId : $routeParams.userCourseItemId, 
			userId           : $rootScope.userId, 
			timestamp        : '',
			message          : $scope.newMessage,
			nickname         : ''
		};
		postObj = newComment;
	  Restangular.all('comment/newcomment').post(postObj, {}, headerObj)
		.then(function (data) {
			$scope.allComment.push(newComment);
			$scope.newMessage = '';
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
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

}
]);