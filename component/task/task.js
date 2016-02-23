ttoApp.component('task', {
  templateUrl: 'component/task/task.html',
  bindings: {task: '='},
  controller: function ($rootScope) {
    vm = this;
    vm.updateChange = function (task) {
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
  }
});