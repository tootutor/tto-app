ttoApp.component('itemContent', {
  templateUrl: 'component/item-content/item-content.html',
  bindings: {item: '='},
  controller: function ($rootScope) {
    this.updateChange = function () {
      $rootScope.isLoading++;
      if (this.item.itemId) {
        this.item.$update(
          function(data) {
            $rootScope.isLoading--;
            $rootScope.showToast('Updated successfully !!!');
            this.item.editMode = false;
          }, function (response) {
            $rootScope.isLoading = 0;
            $rootScope.errorDialog(response, 'Updating Error !!!');
          }
        );
      } else {
        this.item.$save(
          function(data) {
            $rootScope.isLoading--;
            $rootScope.showToast('Added successfully !!!');
            this.item.editMode = false;
          }, function (response) {
            $rootScope.isLoading = 0;
            $rootScope.errorDialog(response, 'Adding Error !!!');
          }
        );
      }
    }
  }
});