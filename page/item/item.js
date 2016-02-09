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

  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $rootScope.isLoading++;
    $scope.itemList = UserItemServ.query(
      {userId: $scope.userId, taskId: $routeParams.taskId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
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
          $rootScope.errorDialog(response, 'Adding Error !!!');
        }
      );
    }
  }
  
  // Event from rootScope view
  $scope.$on('addNewItem', function(event) {
    $scope.addNewItem();
  });

  $scope.addNewTask = function () {
    newTask = new TaskServ();
    newTask.editMode = true;
    newTask.sectionId = null;
    newTask.sectionId = $routeParams.sectionId;
    newTask.seq = 0;
    newTask.code = '';
    newTask.content = '';
    $scope.taskList.push(newTask);
  }

}]);