ttoApp.controller('userSectionCtrl', ['$scope', '$rootScope', '$routeParams', 'UserSectionServ',
function ($scope, $rootScope, $routeParams, UserSectionServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};

  $scope.isNoData = false;

  userCourseCtrlInit();
  
  function userCourseCtrlInit() {
    var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
    $rootScope.isLoading++;
    $scope.userSectionList = UserSectionServ.query({userId: userId, courseId: $routeParams.courseId}, function (data) {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  }

}]);