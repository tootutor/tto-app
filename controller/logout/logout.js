ttoApp.controller('logoutCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
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
		var token = localStorage.getItem('token');
		var userId = localStorage.getItem('userId');
		var postObj = {'userId' : userId};
		var headerObj = {'token' : token};
		Restangular.all('auth/logout').post(postObj, {},headerObj)
		.then(function (data) {
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
		}, function (response) {
			localStorage.setItem('email', '');
			localStorage.setItem('password', '');
			localStorage.setItem('token', '');
			localStorage.setItem('userId', '');
			localStorage.setItem('role', '');
			$rootScope.goRoute('login', 'clear');
		});
	}
}]);