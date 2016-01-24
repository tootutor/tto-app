ttoApp.run(function ($rootScope, $location, $mdSidenav, Restangular, $mdDialog, $http, UserServ) {
	$rootScope.version   = appInfo.version;
	$rootScope.apiPath   = appInfo.apiPath;
	$rootScope.icon      = 'home';
 	$rootScope.title     = 'Home';
 	$rootScope.token     = localStorage.getItem('token');
  $http.defaults.headers.common['token'] = localStorage.getItem('token');
 	$rootScope.headerObj = {'token': $rootScope.token};
 	$rootScope.userId    = localStorage.getItem('userId');
 	$rootScope.email     = localStorage.getItem('email');
 	$rootScope.password  = localStorage.getItem('password');
 	$rootScope.urlStack  = JSON.parse(localStorage.getItem('urlStack'));
 	$rootScope.url       = '/';
 	$rootScope.showBack  = false;
 	$rootScope.backUrl   = '';
 	$rootScope.avatarId  = 'avatar-00';
 	$rootScope.adminShow = false;
	$rootScope.userCourseItemList = {};
	$rootScope.component = {};
	$rootScope.isLoading = 0;

  var opts = {
    lines: 12             // The number of lines to draw
  , length: 7             // The length of each line
  , width: 5              // The line thickness
  , radius: 10            // The radius of the inner circle
  , scale: 5.0            // Scales overall size of the spinner
  , corners: 1            // Roundness (0..1)
  , color: '#000000'      // #rgb or #rrggbb
  , opacity: 1/4          // Opacity of the lines
  , rotate: 0             // Rotation offset
  , direction: 1          // 1: clockwise, -1: counterclockwise
  , speed: 1              // Rounds per second
  , trail: 100            // Afterglow percentage
  , fps: 20               // Frames per second when using setTimeout()
  , zIndex: 2e9           // Use a high z-index by default
  , className: 'spinner'  // CSS class to assign to the element
  , top: '50%'            // center vertically
  , left: '50%'           // center horizontally
  , shadow: true          // Whether to render a shadow
  , hwaccel: false        // Whether to use hardware acceleration (might be buggy)
  , position: 'absolute'  // Element positioning
  }
	var target = document.getElementById('main-spin');
	$rootScope.spinner = new Spinner(opts).spin(target);

 	$rootScope.goRoute = function(path, mode) {
 		switch (mode) {
 			case 'home':
 				$rootScope.urlStack = [];
 				$rootScope.urlStack.push('/');
 				break;
 			case 'clear':
 				$rootScope.urlStack = [];
 				break;
 			case 'skip':
 				break;
 			case 'keep':
 				$rootScope.urlStack.push($rootScope.url);
 				break;
 			default:
 				$rootScope.urlStack.push($rootScope.url);
 				break;
 		}
 		localStorage.setItem('urlStack', JSON.stringify($rootScope.urlStack));
		$location.url(path);
		$mdSidenav('left').close();
	};

	$rootScope.ttoIcon = function(iconId) {
		return ttoIcon(iconId);
	}

	$rootScope.loginDialog = function (ev) {
		$mdDialog.show({
			templateUrl: 'dialog/login/login-dialog.html',
			parent: angular.element(document.body),
			targetEvent: ev,
			clickOutsideToClose: false
		});
	}
	
 	$rootScope.goBack = function() {
		var backUrl = $rootScope.urlStack.pop();
 		localStorage.setItem('urlStack', JSON.stringify($rootScope.urlStack));
		$location.url(backUrl);
		//$mdSidenav('left').close();
	};

 	$rootScope.toggleSidenav = function(menuId) {
  	$mdSidenav(menuId).toggle();
	};
	
	$rootScope.addCourseItem = function() {
		$rootScope.$broadcast('addCourseItem');
	};

	$rootScope.showCommentDialog = function(ev) {
		$mdDialog.show({
		  templateUrl: 'component/comment-dialog/comment-dialog.html',
		  parent: angular.element(document.body),
		  targetEvent: ev,
		  clickOutsideToClose: false
		});
	}

	$rootScope.errorDialog = function(response, title) {
		var error = '';
		if (response) {
			if (response.data.error) {
				if (response.data.error.message.search("Database error [23000]") >= 0) {
					error = "Data already exists - มีข้อมูลในระบบแล้ว"
				} else {
					error = response.data.error.code + ' : ' + response.data.error.message;
				}
			} else {
				error = response.status + ' : ' + response.statusText;
			}
		}
		var alert = $mdDialog.alert({title: title, content: error, ok: 'Close'});
		$mdDialog.show(alert).finally(function() {alert = undefined;});
	};
	
	$rootScope.checkVersion = function() {
	  Restangular.one('app','appinfo').get({}, $rootScope.headerObj)
	  .then(function (data) {
	  	if (appInfo.version >= data.minVersion) {
				$rootScope.loadDefinition();
				$rootScope.initNotification();
	  	} else {
		  	if (appInfo.type == "web") {
					location.reload(true);
		  	} else {
		  		$rootScope.errorDialog(null, 'Please download new version !!!');
		  	}
	  	}
	  }, function (response) {
				$rootScope.errorDialog(response, 'Checking Version Error !!!');
	  });
	};

	$rootScope.loadDefinition = function () {
		$rootScope.isLoading++;
		Restangular.all('item/allitemtype').getList({}, $rootScope.headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$rootScope.allItemType = data;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});

		$rootScope.isLoading++;
		Restangular.all('item/allitemgroup').getList({}, $rootScope.headerObj)
		.then(function (data) {
			if (data.length > 0) {
				$rootScope.allItemGroup = data;
			}
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
	}
	
	$rootScope.initNotification = function() {
		if ($rootScope.notificationCount > 0) {
	    var confirm = $mdDialog.confirm()
	      .title('Notification Alert (' + $rootScope.notificationCount + ')')
	      .content('Do you want to see the notification?')
	      .ariaLabel('go')
	      .ok('Go')
	      .cancel('Cancel');
	    $mdDialog.show(confirm).then(function() {
	    	$rootScope.goRoute('notification', 'home');
			}, function() {
				console.log('Skipped notification!!!');
			});
		}
	};
	
	$rootScope.boardcast = function(eventName) {
		$rootScope.$broadcast(eventName);
	};

	// Initial logic.	
	if ($rootScope.token > '') {
    var user = UserServ.get({userId: $rootScope.userId}, function(data) {
			if (data.status == 'active') {
				$rootScope.isLoggedIn = true;
				$rootScope.notificationCount = data.notificationCount;
				$rootScope.role = data.role;
				$rootScope.nickname = data.nickname;
				$rootScope.avatarId = data.avatarId;
				$rootScope.asUserId = data.asUserId;
				$rootScope.version  = appInfo.version;
				$rootScope.checkVersion();
				window.loading_screen.finish();
			} else {
				window.loading_screen.finish();
				$rootScope.loginDialog();
			}
	  }, function (response) {
  		localStorage.setItem('email', '');
  		localStorage.setItem('password', '');
  		localStorage.setItem('token', '');
  		localStorage.setItem('userId', '');
		 	$rootScope.token     = '';
		 	$rootScope.headerObj = {};
		 	$rootScope.userId    = '';
		 	$rootScope.email     = '';
		 	$rootScope.password  = '';
			$rootScope.isLoggedIn = false;
		 	$rootScope.urlStack = [];
			$rootScope.goRoute('/', 'clear');
			$rootScope.loginDialog();
	  	window.loading_screen.finish();
	  });
	} else {
		$rootScope.isLoggedIn = false;
	 	$rootScope.urlStack = [];
		$rootScope.goRoute('/', 'clear');
		$rootScope.loginDialog();
  	window.loading_screen.finish();
	}
});