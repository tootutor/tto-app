ttoApp.controller('profileCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = "person";
	$rootScope.title = "Profile"; 
	$rootScope.showTab = 0;
 	$rootScope.url = 'profile';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = '/';
 	$rootScope.component = {};
 	$rootScope.component.profileUpdate = true;

	$rootScope.isLoading     = true;
 	$scope.profileUpdate = profileUpdate;

	// Event from rootScope view
	$scope.$on('profileUpdate', function(event) {
		$scope.profileUpdate();
	});
 	
 	profileCtrlInit();
 	
 	function profileCtrlInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
		var headerObj = {'token' : token};

		Restangular.all('user/allAvatar').getList()
		.then(function (data) {
			$scope.allAvatar = data;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});

		Restangular.one('user/profile', userId).get({}, headerObj)
		.then(function (data) {
			$scope.email     = data.email;
			$scope.firstname = data.firstname;
			$scope.lastname  = data.lastname;
			$scope.nickname  = data.nickname;
			$scope.phone     = data.phone;
			$scope.birthdate = new Date(data.birthdate);
			$scope.school    = data.school;
			$scope.province  = data.province;
			$scope.level     = data.level;
			$scope.purpose   = data.purpose;
			$scope.point     = data.point;
			$scope.coin      = data.coin;
			$scope.avatarId  = data.avatarId;

			$rootScope.firstname = data.firstname;
			$rootScope.lastname  = data.lastname;
			$rootScope.nickname  = data.nickname;
			$rootScope.isLoading = false;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

	function profileUpdate() {
		var alert;
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
		var headerObj = {'token' : token};
		var postObj = {
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
		Restangular.one('user/profile', userId).post('', postObj, {}, headerObj)
		.then(function (data) {
			$rootScope.asUserId = $scope.asUserId;
		  var alert = $mdDialog.alert({title: 'Update Completed', content: 'Updated your profile successfully.', ok: 'OK'});
			$mdDialog.show(alert).finally(function() {alert = undefined;});
			$rootScope.goRoute('/', 'clear');
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}

}]);