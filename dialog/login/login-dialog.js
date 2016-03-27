ttoApp.controller('loginDialogCtrl', ['$scope', '$rootScope', '$mdDialog', 'ApiServ', '$http',
function($scope, $rootScope, $mdDialog, ApiServ, $http) {

	$scope.goRegister = function () {
		$mdDialog.hide();
    $rootScope.goRoute('register', 'clear');
	}
  
  $scope.forgetPassword = function () {
		$mdDialog.hide();
  }

	$scope.login = function () {
		var auth = new ApiServ.Auth();
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
			$http.defaults.headers.common['token'] = data.token;
			$rootScope.headerObj = {'token' : data.token};
			$rootScope.userId   = data.userId;
			$rootScope.role     = data.role;
			$rootScope.nickname = data.nickname;
			$rootScope.avatarId = data.avatarId;
			$rootScope.notificationCount = data.notificationCount;
			if (data.status == 'active') {
				$rootScope.isLoggedIn = true;
				$mdDialog.hide();
				$rootScope.goRoute('profile', 'home');
				$rootScope.checkVersion();				
				$rootScope.isLoading--;
			} else {
				$mdDialog.hide();
				$rootScope.isLoading--;
				$mdDialog.show({
					templateUrl: 'dialog/activate/activate-dialog.html',
					parent: angular.element(document.body),
					clickOutsideToClose: false
				});
			}
		}, function (response) {
			$rootScope.isLoading = 0;
      //hideDialog();
			//$rootScope.errorDialog(response, 'Login Error !!!');
      $rootScope.showToast('Login Error !!!!');
		});
	}
	
}
]);