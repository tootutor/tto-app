ttoApp.controller('categoryCtrl', ['$scope', '$rootScope', '$mdDialog', '$routeParams', 'ApiServ',
function ($scope, $rootScope, $mdDialog, $routeParams, ApiServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.isLoading = 0;

  $scope.allCategory = {};
  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  $scope.processMode = $rootScope.processMode();
  
  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $rootScope.component.addCourse = true;
    $rootScope.isLoading++;
    $scope.allCategory = ApiServ.UserCategory.query({userId : $scope.userId}, function() {
      $rootScope.isLoading--;
    }, function(response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  } else {
    $rootScope.isLoading++;
    $scope.allCategory = ApiServ.Category.query(function () {
      $rootScope.isLoading--;
    });
  }

  $scope.nextNavigate = function (category) {
    switch ($scope.processMode) {
      case 'setup' :
        $rootScope.goRoute('/setup/category/' + category.categoryId + '/course');
        break;
      case 'add' :
        $rootScope.goRoute('/add/category/' + category.categoryId + '/course');
        break;
      case 'user' :
        $rootScope.goRoute('/category/' + category.categoryId + '/course');
        break;
      case 'tutor' :
        $rootScope.goRoute('/user/' + $scope.userId + '/category/' + category.categoryId + '/course');
        break;
    }
  }
  
}]);