ttoApp.controller('reviewCtrl', ['$scope', '$rootScope', 'ApiServ',
function ($scope, $rootScope, ApiServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.isLoading = 0;

  /*
  $rootScope.isLoading++;
  $scope.taskList = ApiServ.Task.query(
    {sectionId: 0},
    function (data) {
      $rootScope.isLoading--;
    }
  );
  */
  $rootScope.isLoading++;
  $scope.itemList = ApiServ.Item.query(
    {taskId: 0},
    function (data) {
      $rootScope.isLoading--;
    }
  );
 
}]);