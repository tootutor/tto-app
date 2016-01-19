ttoApp.controller('logoutCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', 'AuthServ',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, AuthServ) {
	$rootScope.icon = "lock_open";
	$rootScope.title = "Logout"; 
	$rootScope.showTab = 0;
 	$rootScope.url = 'logout';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};

	$scope.email    = $rootScope.email;
	$scope.password = $rootScope.password;
	$scope.logout = logout;

	function logout() {
		$rootScope.isLoading++;
		var auth = AuthServ.get({userId: $rootScope.userId}, function () {
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
				$rootScope.goRoute('login', 'clear');
				$rootScope.isLoading--;
			}, function (response) {
				localStorage.setItem('email', '');
				localStorage.setItem('password', '');
				localStorage.setItem('token', '');
				localStorage.setItem('userId', '');
				localStorage.setItem('role', '');
				$rootScope.goRoute('login', 'clear');
				$rootScope.isLoading = 0;
			});
		});
	}
}]);