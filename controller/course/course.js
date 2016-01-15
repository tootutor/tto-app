ttoApp.controller('courseCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
	$rootScope.icon = 'class';
	$rootScope.title = 'Course';
	$rootScope.showTab = 0;
 	$rootScope.url = 'course';
 	$rootScope.showBack = true;
 	$rootScope.backUrl  = 'user-course';
 	$rootScope.component = {};
	
	$rootScope.isLoading = 0;
	$scope.addUserCourse = addUserCourse;
	$scope.notifyCourse = notifyCourse;

 	courseCtrlInit();
 	
 	function courseCtrlInit() {
		var userId = $rootScope.userId;
		var token  = $rootScope.token;
		var headerObj = {'token' : token};
		
		$rootScope.isLoading++;
		Restangular.one('coin/mycoin', userId).get({}, headerObj)
		.then(function (data) {
			$scope.myCoin = data.coin;
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});

		$rootScope.isLoading++;
		Restangular.all('course/allcategory').getList({}, headerObj)
		.then(function (data) {
			$scope.allCategory = data;
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});

		$rootScope.isLoading++;
		Restangular.one('usercourse/availablecourse', userId).get({}, headerObj)
		.then(function (data) {
			$scope.availableCourse = data;
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
 	}
 	
 	function addUserCourse(course, ev) {
    var confirm = $mdDialog.confirm()
      .title('Confirm to order ?')
      .content(course.name)
      .ariaLabel('Add course')
      .ok(course.coin + ' coins')
      .cancel('Cancel')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
			var userId = $rootScope.userId;
			var token  = $rootScope.token;
		 	var headerObj = {'token' : token};
	  	var postObj = {
	  		'courseId' : course.courseId
	  	};
			$rootScope.isLoading++;
			Restangular.one('usercourse/addusercourse',userId).post('', postObj, {}, headerObj)
			.then(function (data) {
				$rootScope.isLoading--;
				$rootScope.goRoute('user-course', 'home');
			}, function (response) {
				$rootScope.errorDialog(response, 'Loading Error !!!');
				$rootScope.isLoading--;
			});
		}, function() {
			console.log('Cancel addUserCourse !!!');
		});
  }

 	function notifyCourse(course, ev) {
    var confirm = $mdDialog.confirm()
      .title('This course is not ready')
      .content('เนื้อหายังไม่พร้อม ต้องการให้ติวเตอร์จัดเตรียมให้หรือไม่ ?')
      .ariaLabel('not ready')
      .ok('Yes')
      .cancel('No')
      .targetEvent(ev);
    $mdDialog.show(confirm).then(function() {
			var userId = $rootScope.userId;
			var token  = $rootScope.token;
		 	var headerObj = {'token' : token};
	  	var postObj = {
	  		'subject' : 'Request a course that is not ready',
	  		'message' : 'userId:' + $rootScope.userId + ' requested ' + course.name
	  	};
			$rootScope.isLoading++;
			Restangular.one('email/sendemailadmin', userId).post('', postObj, {}, headerObj)
			.then(function (data) {
				$rootScope.isLoading--;
				course.disabled = true;
			}, function (response) {
				$rootScope.errorDialog(response, 'Loading Error !!!');
				$rootScope.isLoading--;
			});
		}, function() {
			console.log('Cancel addUserCourse !!!');
		});
  }

}]);