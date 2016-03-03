ttoApp.controller('logoutDialogCtrl', ['$scope', '$rootScope', '$mdDialog', 'ApiServ',
function($scope, $rootScope, $mdDialog, AuthServ) {

	$scope.email    = $rootScope.email;
	$scope.password = $rootScope.password;

	$scope.hideDialog = function () {
		$mdDialog.hide();
	}

	$scope.logout = function () {
		$rootScope.isLoading++;
		var auth = ApiServ.Auth.get({userId: $rootScope.userId}, function () {
			auth.$remove({userId: $rootScope.userId}, function () {
				localStorage.setItem('email', '');
				localStorage.setItem('password', '');
				localStorage.setItem('token', '');
				localStorage.setItem('userId', '');
				localStorage.setItem('role', '');
				$rootScope.email      = '';
				$rootScope.password   = '';
				$rootScope.userId     = '';
				$rootScope.token      = '';
				$rootScope.role       = '';
				$rootScope.notificationCount = '';
				$rootScope.isLoggedIn = false;
				$mdDialog.hide();
				$rootScope.goRoute('/', 'clear');
				$rootScope.isLoading--;
			}, function (response) {
				localStorage.setItem('email', '');
				localStorage.setItem('password', '');
				localStorage.setItem('token', '');
				localStorage.setItem('userId', '');
				localStorage.setItem('role', '');
				$rootScope.goRoute('/', 'clear');
				$rootScope.isLoading = 0;
			});
		});
	}
	
}
]);