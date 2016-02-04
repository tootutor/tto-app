ttoApp.controller('sectionCtrl', ['$scope', '$rootScope', '$routeParams', 'SectionServ', 'UserSectionServ',
function ($scope, $rootScope, $routeParams, SectionServ, UserSectionServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};

  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  $scope.processMode = $rootScope.processMode();
  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $rootScope.isLoading++;
    $scope.sectionList = UserSectionServ.query(
      {userId: $scope.userId, courseId: $routeParams.courseId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.errorDialog(response, 'Loading Error !!!');
      }
    );
  } else {
    $rootScope.isLoading++;
    $scope.sectionList = SectionServ.query(function () {
      $rootScope.isLoading--;
    });
  }

  $scope.nextNavigate = function (section) {
    switch ($scope.processMode) {
      case 'setup' :
        $rootScope.goRoute('section/' + section.sectionId + '/task/setup');
        break;
      case 'user' :
        $rootScope.goRoute('section/' + section.sectionId + '/task');
        break;
      case 'tutor' :
        $rootScope.goRoute('section/' + section.sectionId + '/task/user/'+$scope.userId);
        break;
    }
  }
  
}]);