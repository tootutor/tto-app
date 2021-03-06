ttoApp.controller('userItemCtrl', ['$scope', '$rootScope', '$routeParams', 'ApiServ',
function ($scope, $rootScope, $routeParams, UserItemServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.isLoading = 0;

  userItemCtrlInit();
  
  function userItemCtrlInit() {
    var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
    $rootScope.isLoading++;
    $scope.userItemList = ApiServ.UserItem.query({userId: userId, sectionId: $routeParams.sectionId}, function (data) {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  }

}]);