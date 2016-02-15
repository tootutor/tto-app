ttoApp.component('itemInput', {
  templateUrl: 'component/item-input/item-input.html',
  bindings: {item: '='},
  controller: function ($rootScope) {
    vm = this;
    if (vm.item.content > '') {
      vm.detail = angular.fromJson(vm.item.content);
    } else {
      vm.detail = {};
      vm.detail.question = '';
      vm.detail.allInput = [];
    }
    
    vm.updateChange = function (item) {
      item.content = angular.toJson(vm.detail);
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
    
    vm.addInput = function(detail) {
      detail.allInput.push({
        question : '', 
        answer : '',
        point : 5
      });
    }
    
    vm.removeInput = function(allInput, index) {
      allInput.splice(index, 1);
    }

  }
});