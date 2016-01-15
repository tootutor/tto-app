ttoApp.controller('registerCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = "person_add";
	$rootScope.title = "Register"; 
	$rootScope.showTab = 0;
 	$rootScope.url = 'register';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
 	$rootScope.component.register = true;

	$scope.avatarId = 'avatar-01';

	$scope.register = register;

	// Event from rootScope view
	$scope.$on('register', function(event) {
		$scope.register();
	});

	registerInit();

	function registerInit() {
		Restangular.all('user/allAvatar').getList()
		.then(function (data) {
			$scope.allAvatar = data;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
	}

	function register() {
		var alert;
		var postObj = {
		'email'     : $scope.email1, 
		'password'  : $scope.password1,
		'firstname' : $scope.firstname,
		'lastname'  : $scope.lastname,
		'nickname'  : $scope.nickname,
		'phone'     : $scope.phone,
		'birthdate' : $scope.birthdate,
		'school'    : $scope.school,
		'province'  : $scope.province,
		'level'     : $scope.level,
		'purpose'   : $scope.purpose,
		'avatarId'  : $scope.avatarId
		};
		Restangular.all('user/register').post(postObj)
		.then(function (data) {
			var alert = $mdDialog.alert({
				  title: 'Register Completed',
				  content: 'Please check your email for serial code - ตรวจสอบอีเมล์เพื่อรับรหัส',
				  ok: 'OK'
			});
			$mdDialog.show(alert).finally(function() {alert = undefined;});
			$rootScope.goRoute('/', 'clear');
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}
}]);
