ttoApp.directive('sideMenu', function () {
  return {
    restrict: 'E',
    templateUrl: 'component/side-menu/side-menu.html',
    controller: sideMenuCtrl
  };

  sideMenuCtrl.$inject = ['$scope', '$rootScope', '$mdDialog'];
  function sideMenuCtrl($scope, $rootScope, $mdDialog) {

    $scope.allMenu = [
      {title: 'Home'         , icon: 'home'         , route: '/'             , mode: 'clear'},
      {title: 'Coin'         , icon: 'stars'        , route: '/coin'         , mode: 'home'},
      {title: 'Course'       , icon: 'class'        , route: '/category'     , mode: 'home'},
      {title: 'Notification' , icon: 'notifications', route: '/notification' , mode: 'home'},
      {title: 'Profile'      , icon: 'person'       , route: '/profile'      , mode: 'home'},
    ];

    $scope.allAdminMenu = [
      {title: 'Course Setup'     , icon: 'create' , route: '/course/setup'     , mode: 'home'},
//      {title: 'Add Course Item'  , icon: 'link'   , route: '/add-course-item'  , mode: 'home'},
      {title: 'Coin Admin'       , icon: 'stars'  , route: '/coin-admin'       , mode: 'home'},
      {title: 'Course Tutor'     , icon: 'school' , route: '/course-tutor'     , mode: 'home'},
      {title: 'Test Admin'       , icon: 'warning', route: '/test-admin'       , mode: 'home'}
    ];
		
		$scope.logoutDialog = function (ev) {
      $mdDialog.show({
        templateUrl: 'dialog/logout/logout-dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose: false
      });
		}
  }
  
});