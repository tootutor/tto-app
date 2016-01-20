ttoApp.directive('sideMenu', function () {
  return {
    restrict: 'E',
    templateUrl: 'component/side-menu/side-menu.html',
    controller: sideMenuCtrl,
    link: sideMenuLink
  };

  sideMenuCtrl.$inject = ['$scope', '$rootScope', '$mdDialog'];
  function sideMenuCtrl($scope, $rootScope, $mdDialog) {

    $scope.allInitMenu = [
      {title: 'Login'        , icon: 'lock'         , route: 'login'   , mode: 'home'},
      {title: 'Register'     , icon: 'person_add'   , route: 'register', mode: 'home'}
    ];

    $scope.allMenu = [
      {title: 'Home'         , icon: 'home'         , route: ''             , mode: 'clear'},
      {title: 'Coin'         , icon: 'stars'        , route: 'coin'         , mode: 'home'},
      {title: 'Course'       , icon: 'class'        , route: 'user-category', mode: 'home'},
      {title: 'Notification' , icon: 'notifications', route: 'notification' , mode: 'home'},
      {title: 'Profile'      , icon: 'person'       , route: 'profile'      , mode: 'home'},
      {title: 'Logout'       , icon: 'lock_open'    , route: 'logout'       , mode: 'home'}
    ];

    $scope.allAdminMenu = [
      {title: 'Create Item'      , icon: 'create' , route: 'create-item'      , mode: 'home'},
      {title: 'Add Course Item'  , icon: 'link'   , route: 'add-course-item'  , mode: 'home'},
      {title: 'Coin Admin'       , icon: 'stars'  , route: 'coin-admin'       , mode: 'home'},
      {title: 'User Course Admin', icon: 'school' , route: 'user-course-admin', mode: 'home'},
      {title: 'Test Admin'       , icon: 'warning', route: 'test-admin'       , mode: 'home'}
    ];
  }
  
  function sideMenuLink($scope, $elem, $attr) {
  }

});