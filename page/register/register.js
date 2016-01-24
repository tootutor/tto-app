ttoApp.controller('registerCtrl', ['$scope', '$rootScope', '$mdDialog', 'UserServ', 
function ($scope, $rootScope, $mdDialog, UserServ) {
	$rootScope.icon = "person_add";
	$rootScope.title = "Register"; 
	$rootScope.showTab = 0;
 	$rootScope.url = 'register';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
 	$rootScope.component.register = true;

	$scope.register = register;

	// Event from rootScope view
	//$scope.$on('register', function(event) {
	//	$scope.register();
	//});

	registerInit();

	function registerInit() {
    $scope.allAvatar = ttoAvatarList();
    $scope.user = new UserServ();
    $scope.user.avatarId = 'avatar-01';
	}

	function register() {
		$rootScope.isLoading++;
    $scope.user.$save(function (data) {
			$rootScope.isLoading--;
			var alert = $mdDialog.alert({
				  title: 'Register Completed',
				  content: 'Please check your email for serial code - ตรวจสอบอีเมล์เพื่อรับรหัส',
				  ok: 'OK'
			});
			$mdDialog.show(alert).finally(function() {alert = undefined;});
			$rootScope.goRoute('/', 'clear');
		}, function (response) {
			$rootScope.isLoading = 0;
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}
}]);
