ttoApp.controller('loginCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = "lock";
	$rootScope.title = "Login"; 
	$rootScope.showTab = 0;
 	$rootScope.url = 'login';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};

	$scope.login = login;

	function login() {
  	var postObj = {'email' : $scope.email, 'password' : $scope.password};
		Restangular.all('auth/login').post(postObj)
		.then(function (data) {
			localStorage.setItem('email', $scope.email);
			localStorage.setItem('password', $scope.password);
			localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.userId);
			localStorage.setItem('role', data.role);
			$rootScope.email    = $scope.email;
			$rootScope.password = $scope.passwor;
			$rootScope.token    = data.token;
			$rootScope.headerObj = {'token' : data.token};
			$rootScope.userId   = data.userId;
			$rootScope.role     = data.role;
			$rootScope.nickname = data.nickname;
			$rootScope.avatarId = data.avatarId;
			$rootScope.notificationCount = data.notificationCount;
			$rootScope.isLoggedIn = true;
			$rootScope.isLoggedIn = true;
			$rootScope.goRoute('profile', 'home');
			$rootScope.checkVersion();
		}, function (response) {
			$rootScope.errorDialog(response, 'Login Error !!!');
		});
	}
}]);