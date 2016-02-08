ttoApp.controller('taskCtrl', ['$scope', '$rootScope', '$routeParams', 'TaskServ',
function ($scope, $rootScope, $routeParams, TaskServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};

  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;

  $rootScope.isLoading++;
  $scope.taskList = TaskServ.query(
    {sectionId: $routeParams.sectionId},
    function (data) {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    }
  );

}]);