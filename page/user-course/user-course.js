ttoApp.controller('userCourseCtrl', ['$scope', '$rootScope', '$routeParams', 'UserCourseServ',
function ($scope, $rootScope, $routeParams, UserCourseServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.addCourse = true;

  $scope.isNoData = false;

  userCourseCtrlInit();
  
  function userCourseCtrlInit() {
    var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
    $rootScope.isLoading++;
    $scope.userCourseList = UserCourseServ.query({userId: userId, categoryId: $routeParams.categoryId}, function (data) {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  }

}]);