ttoApp.controller('homeCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', 
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = 'home';
	$rootScope.title = 'Home';
	$rootScope.showTab = 0;
 	$rootScope.showBack = false;
 	$rootScope.backUrl  = '';
 	$rootScope.component = {};
}]);