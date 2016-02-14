ttoApp.controller('itemCtrl', ['$scope', '$rootScope', '$routeParams', 'ItemServ', 'UserItemServ',
function ($scope, $rootScope, $routeParams, ItemServ, UserItemServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.addNewItem = true;

  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  $scope.processMode = $rootScope.processMode();

  $rootScope.isLoading++;
  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $scope.itemList = UserItemServ.query(
      {userId: $scope.userId, taskId: $routeParams.taskId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.isLoading = 0;
        $rootScope.errorDialog(response, 'Loading Error !!!');
      }
    );
  } else {
    $scope.itemList = ItemServ.query(
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