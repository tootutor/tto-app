ttoApp.controller('profileCtrl', ['$scope', '$rootScope', '$mdDialog', 'UserServ',
function ($scope, $rootScope, $mdDialog, UserServ) {
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
    $scope.allAvatar = ttoAvatarList();
    $scope.user = UserServ.get({userId: $rootScope.userId}, function(data) {
			$scope.user.birthdate = new Date(data.birthdate); //Set format for date field
			$rootScope.firstname = data.firstname;
			$rootScope.lastname  = data.lastname;
			$rootScope.nickname  = data.nickname;
			$rootScope.isLoading = false;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}

	function profileUpdate() {
    $scope.user.$update({userId: $rootScope.userId}, function(data) {
		  var alert = $mdDialog.alert({title: 'Update Completed', content: 'Updated your profile successfully.', ok: 'OK'});
			$mdDialog.show(alert).finally(function() {alert = undefined;});
			$rootScope.goRoute('/', 'clear');
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});
	}

}]);