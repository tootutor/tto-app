ttoApp.directive('userItemDetail', function () {
  return {
    restrict: 'E',
    scope: {itemDetail: '='},
    templateUrl: 'component/user-item-detail/user-item-detail.html',
    controller: userItemDetailCtrl,
    link: userItemDetailLink
  };

	userItemDetailCtrl.$inject = ['$scope', '$rootScope', 'Restangular', '$mdDialog', '$filter'];
	
	function userItemDetailCtrl($scope, $rootScope, Restangular, $mdDialog, $filter) {
		$scope.processItemRadioPoint  = processItemRadioPoint;
		$scope.processItemRadio       = processItemRadio;
		$scope.processItemSelect      = processItemSelect;
		$scope.processItemSelectPoint = processItemSelectPoint;
		$scope.processItemInput       = processItemInput;
		$scope.enableEdit             = enableEdit;
		$scope.disableEdit            = disableEdit;
		$scope.updateItemDetail       = updateItemDetail;
		$scope.updateItemRadio        = updateItemRadio;
		$scope.updateItemInput        = updateItemInput;
		$scope.updateItemSelect       = updateItemSelect;
		$scope.saveToLocalStorage     = saveToLocalStorage;
		$scope.loadFromLocalStorage   = loadFromLocalStorage;
		$scope.loadDataURI            = loadDataURI;
	
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
			var headerObj = {'token' : $rootScope.token};
			Restangular.all('usercourseitem/newitemradio').post(postObj, {}, headerObj)
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
			var headerObj = {'token' : $rootScope.token};
			Restangular.all('usercourseitem/newitemselect').post(postObj, {}, headerObj)
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
			var headerObj = {'token' : $rootScope.token};
			Restangular.all('usercourseitem/newiteminput').post(postObj, {}, headerObj)
			.then(function (data) {
				itemDetail.status = 'done';			
				if ($scope.item.actionCount <= 0) {
					$scope.item.status = 'done';
				}
			}, function (response) {
				$rootScope.errorDialog(response, 'Update Error !!!');
			});
		}

		function enableEdit(object) {
			object.editMode = true;
		}

		function disableEdit(object) {
			object.editMode = false;
		}

		function updateItemDetail(itemDetail) {
			var postObj = {};
			var headerObj = {'token' : $rootScope.token};
			if (itemDetail.itemDetailId) {
				postObj = {
					itemDetailId : itemDetail.itemDetailId, 
					itemId       : itemDetail.itemId, 
					seq          : itemDetail.seq,
					itemTypeId   : itemDetail.itemTypeId,
					code         : itemDetail.code,
					content      : itemDetail.content,
					isAction     : itemDetail.isAction,
					showOption   : itemDetail.showOption
				};
				Restangular.all('item/updateitemdetail').post(postObj, {}, headerObj)
				.then(function (data) {
					itemDetail.editMode = false;
					var alert = $mdDialog.alert({title: 'Update Item Detail Completed !!!', content: '', ok: 'OK'});
					$mdDialog.show( alert ).finally(function() {alert = undefined;});
				}, function (response) {
					$rootScope.errorDialog(response, 'Update Error !!!');
				});
			} else {
				postObj = {
					itemId       : itemDetail.itemId, 
					seq          : itemDetail.seq,
					itemTypeId   : itemDetail.itemTypeId,
					code         : itemDetail.code,
					content      : itemDetail.content,
					isAction     : itemDetail.isAction,
					showOption   : itemDetail.showOption
				};
				Restangular.all('item/newitemdetail').post(postObj, {}, headerObj)
				.then(function (data) {
					itemDetail.itemDetailId = data.itemDetailId;
					itemDetail.editMode = false;
					var alert = $mdDialog.alert({title: 'Added Item Detail !!!', content: '', ok: 'OK'});
					$mdDialog.show( alert ).finally(function() {alert = undefined;});
				}, function (response) {
					$rootScope.errorDialog(response, 'Add Error !!!');
				});
			}
		}

		function updateItemRadio(itemRadio) {
			var postObj = {};
			var headerObj = {'token' : $rootScope.token};
			postObj = {
				itemRadioId : itemRadio.itemRadioId, 
				content     : itemRadio.content,
				isAnswer    : itemRadio.isAnswer,
				point       : itemRadio.point
			};
			Restangular.all('item/updateitemradio').post(postObj, {}, headerObj)
			.then(function (data) {
				var alert = $mdDialog.alert({title: 'Update Item Radio Completed !!!', content: '', ok: 'OK'});
				$mdDialog.show( alert ).finally(function() {alert = undefined;});
			}, function (response) {
				$rootScope.errorDialog(response, 'Update Error !!!');
			});
		}

		function updateItemSelect(itemSelect) {
			var postObj = {};
			var headerObj = {'token' : $rootScope.token};
			postObj = {
				itemSelectId : itemSelect.itemSelectId, 
				content      : itemSelect.content,
				isAnswer     : itemSelect.isAnswer,
				point        : itemSelect.point
			};
			Restangular.all('item/updateitemselect').post(postObj, {}, headerObj)
			.then(function (data) {
				var alert = $mdDialog.alert({title: 'Update Item Select Completed !!!', content: '', ok: 'OK'});
				$mdDialog.show( alert ).finally(function() {alert = undefined;});
			}, function (response) {
				$rootScope.errorDialog(response, 'Update Error !!!');
			});
		}

		function updateItemInput(itemInput) {
			var postObj = {};
			var headerObj = {'token' : $rootScope.token};
			postObj = {
				itemInputId : itemInput.itemInputId, 
				question    : itemInput.question,
				answer      : itemInput.answer,
				answerType  : itemInput.answerType,
				point       : itemInput.point
			};
			Restangular.all('item/updateiteminput').post(postObj, {}, headerObj)
			.then(function (data) {
				var alert = $mdDialog.alert({title: 'Update Item Input Completed !!!', content: '', ok: 'OK'});
				$mdDialog.show( alert ).finally(function() {alert = undefined;});
			}, function (response) {
				$rootScope.errorDialog(response, 'Update Error !!!');
			});
		}

		function saveToLocalStorage(itemDetail) {
			var storageName = 'ttoContent' + itemDetail.itemTypeId;
			localStorage.setItem(storageName, itemDetail.content);
			var alert = $mdDialog.alert({title: 'Saved to ' + storageName, content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}

		function loadFromLocalStorage(itemDetail) {
			var storageName = 'ttoContent' + itemDetail.itemTypeId;
			itemDetail.content = localStorage.getItem(storageName);
			var alert = $mdDialog.alert({title: 'Loaded from ' + storageName, content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}

		function loadDataURI(itemDetail) {
			var storageName = 'ttoCopyPaste';
			itemDetail.content = localStorage.getItem(storageName);
			var alert = $mdDialog.alert({title: 'Loaded from ttoCopyPaste', content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}
	
	}
	
	function userItemDetailLink($scope, $elem, $attr) {
	}

}
);