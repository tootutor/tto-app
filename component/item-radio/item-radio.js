ttoApp.component('itemRadio', {
  templateUrl: 'component/item-radio/item-radio.html',
  bindings: {item: '='},
  controller: function ($rootScope, UserItemServ) {
    vm = this;
    console.log(vm.item);
    if (vm.item.content > '') {
      vm.detail = angular.fromJson(vm.item.content);
    } else {
      vm.detail = {};
      vm.detail.question = '';
      vm.detail.allRadio = [];
    }
    if (vm.item.userContent > '') {
      vm.userDetail = angular.fromJson(vm.item.userContent);
    } else {
      vm.userDetail = {};
      vm.userDetail.radioIndex = null;
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
    
    vm.addRadio = function(detail) {
      detail.allRadio.push({
        content : '', 
        isAnswer : false,
        point : -1
      });
    }
    
    vm.removeRadio = function(allRadio, index) {
      allRadio.splice(index, 1);
    }

    vm.processRadio = function (item, userDetail) {
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