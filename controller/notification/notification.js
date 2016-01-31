ttoApp.controller('notificationCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav) {
  $rootScope.icon = 'notifications';
  $rootScope.title = 'Notification';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};

  $scope.processNotification = processNotification;

  notificationInit();
  
  function notificationInit() {
    var userId = $rootScope.userId;
    var token  = $rootScope.token;
    var headerObj = {'token' : token};

    $rootScope.isLoading++;
    Restangular.one('notification/allnotification', userId).get({}, headerObj)
    .then(function (data) {
      if (data.length > 0) {
        $scope.allNotification = data;
      } else {
        $scope.isNoData = true;
      }
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  }
  
  function processNotification(notification) {
    $scope.loadTarget++;
    var userId = $rootScope.userId;
    var token  = $rootScope.token;
    var headerObj = {'token' : token};
    var postObj = {
      userId       : notification.userId, 
      routeUrl     : notification.routeUrl, 
      fromUserId   : notification.fromUserId
    };
    $rootScope.isLoading++;
    Restangular.all('notification/removenotification').post(postObj, {}, headerObj)
    .then(function (data) {
      $rootScope.notificationCount--;
      $rootScope.goRoute(notification.routeUrl, 'keep');
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
  });
  }

}
]);