ttoApp.controller('coinAdminCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $filter) {
	$rootScope.icon = "stars";
	$rootScope.title = "Coins Admin"; 
	$rootScope.showTab = 0;
 	$rootScope.url = 'coin-admin';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
	$rootScope.isLoading = 0;

	$scope.coinApproveOrder = coinApproveOrder;

 	coinAdminCtrlInit();
 	
 	function coinAdminCtrlInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
		$rootScope.isLoading++;
	  Restangular.all('coin/allorder').getList({}, headerObj)
  	.then(function (data) {
  		$scope.allorder = data;
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
  	});
 	}

	function coinApproveOrder(order) {
		var alert;
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};
		var coinOrderId = order.coinOrderId;
  	var postObj = {'userId' : order.userId};
  	
		$rootScope.isLoading++;
    Restangular.one('coin/approveorder', coinOrderId).post('', postObj, {}, headerObj)
  	.then(function (data) {
	    var alert = $mdDialog.alert({title: 'Update Completed !!!', content: '', ok: 'OK'});
	  	$mdDialog.show( alert ).finally(function() {alert = undefined;});
	  	order.status = 'approve';
			$rootScope.isLoading--;
  	}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
  	});
	}
	
}
]);