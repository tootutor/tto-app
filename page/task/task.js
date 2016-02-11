ttoApp.controller('taskCtrl', ['$scope', '$rootScope', '$routeParams', 'TaskServ', 'UserTaskServ',
function ($scope, $rootScope, $routeParams, TaskServ, UserTaskServ) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.addNewTask = true;

  $scope.userId = $routeParams.userId ? $routeParams.userId : $rootScope.userId;
  $scope.processMode = $rootScope.processMode();

  $rootScope.isLoading++;
  if ($scope.processMode == 'user' || $scope.processMode == 'tutor') {
    $scope.taskList = UserTaskServ.query(
      {userId: $scope.userId, sectionId: $routeParams.sectionId}, 
      function (data) {
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.isLoading = 0;
        $rootScope.errorDialog(response, 'Loading Error !!!');
      }
    );
  } else {
    $scope.taskList = TaskServ.query(
      {sectionId: $routeParams.sectionId},
      function (data) {
        $rootScope.isLoading--;
      }
    );
  }

  $scope.nextNavigate = function (task) {
    switch ($scope.processMode) {
      case 'setup' :
        $rootScope.goRoute('/setup/task/' + task.taskId + '/item');
        break;
      case 'user' :
        $rootScope.goRoute('/task/' + task.taskId + '/item');
        break;
      case 'tutor' :
        $rootScope.goRoute('/user/' + $scope.userId + '/task/' + task.taskId + '/item');
        break;
    }
  }
  
  $scope.updateChange = function (task) {
    $rootScope.isLoading++;
    if (task.taskId) {
      task.$update(
        function(data) {
          $rootScope.isLoading--;
          $rootScope.showToast('Updated successfully !!!');
          task.editMode = false;
        }, function (response) {
          $rootScope.isLoading = 0;
          $rootScope.errorDialog(response, 'Updating Error !!!');
        }
      );
    } else {
      task.$save(
        function(data) {
          $rootScope.isLoading--;
          $rootScope.showToast('Added successfully !!!');
          task.editMode = false;
        }, function (response) {
          $rootScope.isLoading = 0;
          $rootScope.errorDialog(response, 'Adding Error !!!');
        }
      );
    }
  }
  
  // Event from rootScope view
  $scope.$on('addNewTask', function(event) {
    $scope.addNewTask();
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