ttoApp.controller('groupCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.component = {};

 	groupCtrlInit();
 	
 	function courseCtrlInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
	 	var headerObj = {'token' : token};

	  Restangular.all('group').all('allgroup').getList({}, headerObj)
	  	.then(function (data) {
	  		$scope.allGroup = data;
	  	}, function (response) {
	  		alert('Error !!! ' + response.data.error.code + ' : ' + response.data.error.message);
	  	});
 	}

}]);