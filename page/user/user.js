ttoApp.controller('userCtrl', ['$scope', '$rootScope', '$routeParams', 'UserServ',
function ($scope, $rootScope, $routeParams, UserServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Tutor';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.isLoading = 0;

  $rootScope.isLoading++;
  $scope.userList = UserServ.query(
    function () {
      $rootScope.isLoading--;
    }
  );

  $scope.nextNavigate = function (user) {
    $rootScope.goRoute('/user/' + user.userId + '/category');
  }
  
}]);