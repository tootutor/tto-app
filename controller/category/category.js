ttoApp.controller('categoryCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', 
	function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams) {
		$rootScope.icon = 'class';
		$rootScope.title = 'Category';
		$rootScope.showTab = 0;
		$rootScope.url = 'category';
		$rootScope.showBack = true;
		$rootScope.backUrl  = '/';
		$rootScope.component = {};
		$rootScope.isLoading = 0;

		categoryCtrlInit();
		
		function categoryCtrlInit() {
			var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
			$rootScope.isLoading++;
			Restangular.one('category/user',userId).get({}, $rootScope.headerObj)
			.then(function (data) {
				$scope.allCategory = data;
				$rootScope.isLoading--;
			}, function (response) {
				$rootScope.errorDialog(response, 'Loading Error !!!');
			});
		}

	}]
);