ttoApp.controller('activateDialogCtrl', ['$scope', '$rootScope', '$mdDialog', 'AuthServ',
function($scope, $rootScope, $mdDialog, AuthServ) {

	$rootScope.isLoading++;
	$scope.auth = AuthServ.get({userId: $rootScope.userId}, function () {
		$rootScope.isLoading--;
	});

	$scope.activate = function () {
		$rootScope.isLoading++;
		$scope.auth.$update({userId: $rootScope.userId}, function (data) {
			if (data.status == 'active') {
				$rootScope.isLoggedIn = true;
				$mdDialog.hide();
				$rootScope.goRoute('/', 'clear');
				$rootScope.checkVersion();				
				$rootScope.isLoading--;
			} else {
				var alert = $mdDialog.alert({
						title: 'Activate Error',
						content: 'Serial Number is not correct - รหัสผ่านไม่ถูกต้อง',
						ok: 'OK'
				});
				$mdDialog.show(alert).finally(function() {alert = undefined;});
			}
		}, function (response) {
			$rootScope.isLoading = 0;
      $mdDialog.hide();
			$rootScope.errorDialog(response, 'Activate Error !!!');
		});
	}
	
}
]);