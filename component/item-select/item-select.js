ttoApp.component('itemSelect', {
  templateUrl: 'component/item-select/item-select.html',
  bindings: {item: '='},
  controller: function ($rootScope) {
    vm = this;
    if (vm.item.content > '') {
      vm.detail = angular.fromJson(vm.item.content);
    } else {
      vm.detail = {};
      vm.detail.question = '';
      vm.detail.allSelect = [];
    }
    if (vm.item.userContent > '') {
      vm.userDetail = angular.fromJson(vm.item.userContent);
    } else {
      vm.userDetail = {};
      vm.userDetail.allUserSelect = [];
      // initial user value for all select items
      for (i=0; i<vm.detail.allSelect.length; i++) {
        vm.userDetail.allUserSelect[i] = false;
      }
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
    
    vm.addSelect = function(detail) {
      detail.allSelect.push({
         content : '', 
         isAnswer : false,
         point : -1
      });
    }
    
    vm.removeSelect = function(allSelect, index) {
      allSelect.splice(index, 1);
    }

    vm.processSelect = function () {
      console.log(vm.userDetail);
    }

  }
});