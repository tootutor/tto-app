ttoApp.controller('sectionCtrl', ['$scope', '$rootScope', '$routeParams', 'SectionServ', 'UserSectionServ', 'CourseServ',
function ($scope, $rootScope, $routeParams, SectionServ, UserSectionServ, CourseServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.isLoading = 0;

  if ($rootScope.role == 'admin') {
    $rootScope.component.addNewSection = true;
  }

  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  $scope.processMode = $rootScope.processMode();
  
  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $rootScope.isLoading++;
    $scope.sectionList = UserSectionServ.query(
      {userId: $scope.userId, courseId: $routeParams.courseId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.isLoading = 0;
        $rootScope.errorDialog(response, 'Loading Error !!!');
      }
    );
  } else {
    $rootScope.isLoading++;
    $scope.sectionList = SectionServ.query(
      {courseId: $routeParams.courseId},
      function () {
        $rootScope.isLoading--;
      }
    );
  }

  $scope.nextNavigate = function (section) {
    switch ($scope.processMode) {
      case 'setup' :
        $rootScope.goRoute('/setup/section/' + section.sectionId + '/task');
        break;
      case 'user' :
        $rootScope.goRoute('/section/' + section.sectionId + '/task');
        break;
      case 'tutor' :
        $rootScope.goRoute('/user/' + $scope.userId + '/section/' + section.sectionId + '/task');
        break;
    }
  }

  $scope.updateChange = function (section) {
    $rootScope.isLoading++;
    if (section.sectionId) {
      section.$update(
        function(data) {
          $rootScope.isLoading--;
          $rootScope.showToast('Updated successfully !!!');
          section.editMode = false;
        }, function (response) {
          $rootScope.isLoading = 0;
          $rootScope.errorDialog(response, 'Updating Error !!!');
        }
      );
    } else {
      section.$save(
        function(data) {
          $rootScope.isLoading--;
          $rootScope.showToast('Added successfully !!!');
          section.editMode = false;
        }, function (response) {
          $rootScope.isLoading = 0;
          $rootScope.errorDialog(response, 'Adding Error !!!');
        }
      );
    }
  }
  
  // Event from rootScope view
  $scope.$on('addNewSection', function(event) {
    $scope.addNewSection();
  });

  $scope.addNewSection = function () {
    newSection = new SectionServ();
    newSection.editMode = true;
    newSection.sectionId = null;
    newSection.courseId = $routeParams.courseId;
    newSection.seq = 0;
    newSection.name = '';
    newSection.description = '';
    $scope.sectionList.push(newSection);
  }
  
}]);