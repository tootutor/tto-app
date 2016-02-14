ttoApp.component('itemRadio', {
  templateUrl: 'component/item-radio/item-radio.html',
  bindings: {item: '='},
  controller: function ($rootScope) {
    vm = this;
    if (vm.item.content > '') {
      vm.detail = JSON.parse(vm.item.content);
    } else {
      vm.detail = {};
      vm.detail.question = '';
      vm.detail.allRadio = [];
    }
    
    vm.updateChange = function (item) {
      item.content = JSON.stringify(vm.detail);
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
    
    vm.addRadio = function(detail) {
      detail.allRadio.push({
         content : '', 
         isAnswer : false,
         point : -1
      });
    }

  }
});