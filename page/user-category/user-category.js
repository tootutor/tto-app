ttoApp.controller('userCategoryCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', 'UserCategoryServ',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, UserCategoryServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.addCourse = true;

  $scope.allCategory = {};

  userCategoryCtrlInit();
  
  function userCategoryCtrlInit() {
    var userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
    $rootScope.isLoading++;
    $scope.allCategory = UserCategoryServ.query({userId : userId}, function() {
      $rootScope.isLoading--;
    }, function(response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  }

}]);