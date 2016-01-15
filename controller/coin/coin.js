ttoApp.controller('coinCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = "stars";
	$rootScope.title = "Coins"; 
	$rootScope.showTab = 0;
 	$rootScope.url = 'coin';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
	
	$rootScope.isLoading = 0;

	$scope.myCoin = 0;
	//$scope.neworder = {amount : 1000, coin : 1000, bonus : 50};
	$scope.confirmOrder = {};
	$scope.confirmOrder.bankId = 1;
	$scope.orderList = [];
	
	$scope.coinNewOrder = coinNewOrder;
	$scope.coinSelect = coinSelect;
	$scope.coinConfirmOrder = coinConfirmOrder;

 	coinCtrlInit();
 	
 	function coinCtrlInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
		$rootScope.isLoading++;
	  Restangular.all('bank/allbank').getList({}, headerObj)
  	.then(function (data) {
  		$scope.allBank = data;
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});

		$rootScope.isLoading++;
	  Restangular.one('coin/mycoin', userId).get({}, headerObj)
  	.then(function (data) {
  		$scope.myCoin = data.coin;
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});

		$rootScope.isLoading++;
	  Restangular.one('coin/orderlist', userId).get({}, headerObj)
  	.then(function (data) {
  		$scope.orderList = data;
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});

		$rootScope.isLoading++;
	  Restangular.all('coin/allpackage').getList({}, headerObj)
  	.then(function (data) {
  		$scope.allPackage = data;
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});
 	}

	function coinNewOrder() {
		var alert;
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
  	var postObj = {
  		'userId' : userId,
  		'coin'   : $scope.neworder.coin,
  		'bonus'  : $scope.neworder.bonus,
  		'amount' : $scope.neworder.amount
  	};

		$rootScope.isLoading++;
    Restangular.all('coin/neworder').post(postObj, {}, headerObj)
  	.then(function (data) {
	    var alert = $mdDialog.alert({title: 'Update Completed !!!', content: '', ok: 'OK'});
	  	$mdDialog.show( alert ).finally(function() {alert = undefined;});
	  	$scope.orderList.push(data[0]);
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
  	});
	}

	function coinSelect(index) {
		$scope.neworder  = $scope.allPackage[index];
	}

	function coinConfirmOrder(order) {
		var alert;
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
		var coinOrderId = order.coinOrderId;
  	var postObj = {
  		'userId'         : userId,
  		'bankId'         : order.bankId,
  		'transferAmount' : order.updatedTransferAmount,
  		'transferDate'   : order.updatedTransferDate
  	};
  	
		$rootScope.isLoading++;
    Restangular.one('coin/confirmorder', coinOrderId).post('', postObj, {}, headerObj)
  	.then(function (data) {
	    var alert = $mdDialog.alert({title: 'Update Completed !!!', content: '', ok: 'OK'});
	  	$mdDialog.show( alert ).finally(function() {alert = undefined;});
	  	order.status = 'confirm';
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
  	});

	}
	
}]);