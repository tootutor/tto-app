ttoApp.controller('courseCtrl', ['$scope', '$rootScope', '$routeParams', 'CourseServ', 'UserCourseServ',
function ($scope, $rootScope, $routeParams, CourseServ, UserCourseServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.addCourse = true;

  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  
  $scope.processMode = $rootScope.processMode();
  
  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $rootScope.isLoading++;
    $scope.courseList = UserCourseServ.query(
      {userId: $scope.userId, categoryId: $routeParams.categoryId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.errorDialog(response, 'Loading Error !!!');
      }
    );
  } else {
    $rootScope.isLoading++;
    $scope.courseList = CourseServ.query(function () {
      $rootScope.isLoading--;
    });
  }

  $scope.nextNavigate = function (course) {
    switch ($scope.processMode) {
      case 'add' :
        break;
      case 'setup' :
        $rootScope.goRoute('course/' + course.courseId + '/section/setup');
        break;
      case 'user' :
        $rootScope.goRoute('course/' + course.courseId + '/section');
        break;
      case 'tutor' :
        $rootScope.goRoute('course/' + course.courseId + '/section/user/' + $scope.userId);
        break;
    }
  }
  
}]);