ttoApp.controller('itemCtrl', ['$scope', '$rootScope', '$routeParams', 'ApiServ',
function ($scope, $rootScope, $routeParams, ApiServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.isLoading = 0;

  if ($rootScope.role == 'admin') {
    $rootScope.component.addNewItem = true;
  }
  
  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  $scope.processMode = $rootScope.processMode();

  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $rootScope.isLoading++;
    $scope.task = ApiServ.UserTask.get(
      {userId: $scope.userId, taskId: $routeParams.taskId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.isLoading = 0;
        $rootScope.errorDialog(response, 'Loading Error !!!');
      }
    );
    $rootScope.isLoading++;
    $scope.itemList = ApiServ.UserItem.query(
      {userId: $scope.userId, taskId: $routeParams.taskId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.isLoading = 0;
        $rootScope.errorDialog(response, 'Loading Error !!!');
      }
    );
  } else {
    $rootScope.isLoading++;
    $scope.task = ApiServ.Task.get(
      {taskId: $routeParams.taskId},
      function (data) {
        $rootScope.isLoading--;
      }
    );
    $rootScope.isLoading++;
    $scope.itemList = ApiServ.Item.query(
      {taskId: $routeParams.taskId},
      function (data) {
        $rootScope.isLoading--;
      }
    );
  }

  $scope.updateChange = function (item) {
    $rootScope.isLoading++;
    if (item.itemId) {
      item.$update(
        function(data) {
          $rootScope.isLoading--;
          $rootScope.showToast('Updated successfully !!!');
          item.editMode = false;
        }, function (response) {
          $rootScope.isLoading = 0;
          $rootScope.errorDialog(response, 'Updating Error !!!');
        }
      );
    } else {
      item.$save(
        function(data) {
          $rootScope.isLoading--;
          $rootScope.showToast('Added successfully !!!');
          item.editMode = false;
        }, function (response) {
          $rootScope.isLoading = 0;
          $rootScope.errorDialog(response, 'Adding Error !!!');
        }
      );
    }
  }
  
  // Event from rootScope view
  $scope.$on('addNewItem', function(event) {
    $scope.addNewItem();
  });

  $scope.addNewItem = function () {
    newItem = new ItemServ();
    newItem.editMode = true;
    newItem.itemId = null;
    newItem.itemTypeId = 2;
    newItem.taskId = $routeParams.taskId;
    newItem.seq = 0;
    newItem.code = '';
    newItem.content = '';
    $scope.itemList.push(newItem);
  }
  
}]);