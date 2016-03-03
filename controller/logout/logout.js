ttoApp.controller('logoutCtrl', ['$scope', '$http', '$rootScope', '$mdDialog', 'ApiServ',
function ($scope, $http, $rootScope, $mdDialog, ApiServ) {
  $rootScope.icon = "lock_open";
  $rootScope.title = "Logout"; 
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};

  $scope.email    = $rootScope.email;
  $scope.password = $rootScope.password;
  $scope.logout = logout;

  function logout() {
    $rootScope.isLoading++;
    var auth = ApiServ.Auth.get({userId: $rootScope.userId}, function () {
      auth.$remove({userId: $rootScope.userId}, function () {
        localStorage.setItem('email', '');
        localStorage.setItem('password', '');
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        localStorage.setItem('role', '');
        $rootScope.email      = '';
        $rootScope.password   = '';
        $rootScope.userId     = '';
        $rootScope.token      = '';
        $http.defaults.headers.common['token'] = '';
        $rootScope.role       = '';
        $rootScope.notificationCount = '';
        $rootScope.isLoggedIn = false;
        $mdDialog.hide();
        $rootScope.goRoute('login', 'clear');
        $rootScope.isLoading--;
      }, function (response) {
        localStorage.setItem('email', '');
        localStorage.setItem('password', '');
        localStorage.setItem('token', '');
        localStorage.setItem('userId', '');
        localStorage.setItem('role', '');
        $rootScope.goRoute('login', 'clear');
        $rootScope.isLoading = 0;
      });
    });
  }
}]);