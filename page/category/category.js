ttoApp.controller('categoryCtrl', ['$scope', '$rootScope', '$mdDialog', '$routeParams', 'CategoryServ', 'UserCategoryServ',
function ($scope, $rootScope, $mdDialog, $routeParams, CategoryServ, UserCategoryServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};

  $scope.allCategory = {};
  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  $scope.processMode = $rootScope.processMode();
  
  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $rootScope.component.addCourse = true;
    $rootScope.isLoading++;
    $scope.allCategory = UserCategoryServ.query({userId : $scope.userId}, function() {
      $rootScope.isLoading--;
    }, function(response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  } else {
    $rootScope.isLoading++;
    $scope.allCategory = CategoryServ.query(function () {
      $rootScope.isLoading--;
    });
  }

  $scope.nextNavigate = function (category) {
    switch ($scope.processMode) {
      case 'setup' :
        $rootScope.goRoute('category/' + category.categoryId + '/course/setup');
        break;
      case 'add' :
        $rootScope.goRoute('category/' + category.categoryId + '/course/add');
        break;
      case 'user' :
        $rootScope.goRoute('category/' + category.categoryId + '/course');
        break;
      case 'tutor' :
        $rootScope.goRoute('category/' + category.categoryId + '/course/user/' + $scope.userId);
        break;
    }
  }
  
}]);