ttoApp.controller('loginDialogCtrl', ['$scope', '$rootScope', '$mdDialog', 'AuthServ',
function($scope, $rootScope, $mdDialog, AuthServ) {

	$scope.goRegister = goRegister;
	$scope.login = login;

	function goRegister() {
		$mdDialog.hide();
    $rootScope.goRoute('register', 'clear');
	}

	function login() {
		var auth = new AuthServ();
		auth.email = $scope.email;
		auth.password = $scope.password;
		$rootScope.isLoading++;
		auth.$save(function (data) {
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
      hideDialog();
			$rootScope.goRoute('profile', 'home');
			$rootScope.checkVersion();
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.isLoading = 0;
      hideDialog();
			$rootScope.errorDialog(response, 'Login Error !!!');
		});
	}
	
}
]);