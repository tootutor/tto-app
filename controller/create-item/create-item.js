ttoApp.controller('createItemCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = 'edit';
	$rootScope.title = 'Create Item';
	$rootScope.showTab = 0;
 	$rootScope.url = 'create-item';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
 	$rootScope.component.addNewItem = true;
	$rootScope.isLoading = 0;

	$scope.isNoData = false;

	$scope.newItem = {
		code : '', 
		content : '', 
		itemGroupId : 1, 
		allItemDetail : []
	};

	$scope.addItemDetail     = addItemDetail;
	$scope.removeItemDetail  = removeItemDetail;
	$scope.addItemRadio      = addItemRadio;
	$scope.removeItemRadio   = removeItemRadio;
	$scope.addItemSelect     = addItemSelect;
	$scope.removeItemSelect  = removeItemSelect;
	$scope.addItemInput      = addItemInput;
	$scope.removeItemInput   = removeItemInput;
	$scope.updatePoint       = updatePoint;
	$scope.setIsAction       = setIsAction;

	$scope.addNewItem        = addNewItem;

	// Event from rootScope view
	$scope.$on('addNewItem', function(event) {
		$scope.addNewItem();
	});

 	createItemInit();
 	
 	function createItemInit() {
 		//$scope.$on('addNewItem', addNewItem);
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};

		$rootScope.isLoading++;
		Restangular.all('item/allitemtype').getList({}, headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$scope.allItemType = data;
			} else {
				$scope.isNoData = true;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});

		$rootScope.isLoading++;
		Restangular.all('item/allitemgroup').getList({}, headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$scope.allItemGroup = data;
			} else {
				$scope.isNoData = true;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}
 	
 	function addItemDetail() {
 		var newItemDetail = {
			itemTypeId : 0, 
			seq : 0, 
			code : $scope.newItem.code,
			content : '',
			isAction : false,
			allItemRadio : [],
			allItemSelect : [],
			allItemInput : []
 		};
 		$scope.newItem.allItemDetail.push(newItemDetail);
 	}

 	function removeItemDetail(itemDetail) {
 		var index = $scope.newItem.allItemDetail.indexOf(itemDetail);
 		$scope.newItem.allItemDetail.splice(index, 1);
 	}

 	function addItemRadio(newItemDetail) {
 		var newItemRadio = {
       content : '', 
       isAnswer : 0,
       point : -1
 		};
 		newItemDetail.allItemRadio.push(newItemRadio);
 	}

 	function removeItemRadio(itemDetail, itemRadio) {
 		var itemDetailIndex = $scope.newItem.allItemDetail.indexOf(itemDetail);
 		var itemRadioIndex = $scope.newItem.allItemDetail[itemDetailIndex].allItemRadio.indexOf(itemRadio);
 		$scope.newItem.allItemDetail[itemDetailIndex].allItemRadio.splice(itemRadioIndex, 1);
 	}

 	function addItemSelect(newItemDetail) {
 		var newItemSelect = {
       content : '', 
       isAnswer : 0,
       point : -1
 		};
 		newItemDetail.allItemSelect.push(newItemSelect);
 	}

 	function removeItemSelect(itemDetail, itemSelect) {
 		var itemDetailIndex = $scope.newItem.allItemDetail.indexOf(itemDetail);
 		var itemSelectIndex = $scope.newItem.allItemDetail[itemDetailIndex].allItemSelect.indexOf(itemSelect);
 		$scope.newItem.allItemDetail[itemDetailIndex].allItemSelect.splice(itemSelectIndex, 1);
 	}

 	function addItemInput(newItemDetail) {
 		var newItemInput = {
       question : '', 
       answer : '',
       point : 5
 		};
 		newItemDetail.allItemInput.push(newItemInput);
 	}

 	function removeItemInput(itemDetail, itemInput) {
 		var itemDetailIndex = $scope.newItem.allItemDetail.indexOf(itemDetail);
 		var itemInputIndex = $scope.newItem.allItemDetail[itemDetailIndex].allItemInput.indexOf(itemInput);
 		$scope.newItem.allItemDetail[itemDetailIndex].allItemInput.splice(itemInputIndex, 1);
 	}

	function updatePoint(itemRadioSelect) {
		if (itemRadioSelect.isAnswer) {
			itemRadioSelect.point = 5;
		} else {
			itemRadioSelect.point = -1;
		}
	}

 	function addNewItem() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
	 	var postObj = $scope.newItem;

		$rootScope.isLoading++;
		Restangular.all('item/newitem').post(postObj, {}, headerObj)
		.then(function (data) {
			$rootScope.isLoading--;
		  var alert = $mdDialog.alert({title: 'Add Item Completed !!!', content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
 	}
 	
 	function setIsAction(itemDetail) {
		for (var i = 0; i < $scope.allItemType.length; i++) {
			if ($scope.allItemType[i].itemTypeId == itemDetail.itemTypeId) {
				if ($scope.allItemType[i].isAction == '1') {
					itemDetail.isAction = true;
				} else {
					itemDetail.isAction = false;
				}
				return;
			}
		}
 	}

}
]);