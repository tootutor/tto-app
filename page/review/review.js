ttoApp.controller('reviewCtrl', ['$scope', '$rootScope', 'TaskServ', 'ItemServ',
function ($scope, $rootScope, TaskServ, ItemServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.isLoading = 0;

  /*
  $rootScope.isLoading++;
  $scope.taskList = TaskServ.query(
    {sectionId: 0},
    function (data) {
      $rootScope.isLoading--;
    }
  );
  */
  $rootScope.isLoading++;
  $scope.itemList = ItemServ.query(
    {taskId: 0},
    function (data) {
      $rootScope.isLoading--;
    }
  );
 
}]);