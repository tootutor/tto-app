ttoApp.component('itemSelect', {
  templateUrl: 'component/item-select/item-select.html',
  bindings: {item: '='},
  controller: function ($rootScope, UserItemServ) {
    vm = this;
    console.log(vm.item);
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
      vm.userDetail.allSelect = [];
      // initial user value for all select items
      for (i=0; i<vm.detail.allSelect.length; i++) {
        vm.userDetail.allSelect[i] = false;
      }
    }
    
    vm.updateChange = function (item, detail) {
      item.content = angular.toJson(detail);
      console.log(item);
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

    vm.processSelect = function (item, userDetail) {
      var userItem = new UserItemServ();
      userItem.userId = $rootScope.userId;
      userItem.itemId = item.itemId;
      userItem.point = 0;
      userItem.userContent = angular.toJson(userDetail);
      console.log(userItem);
      userItem.$save();
    }

  }
});