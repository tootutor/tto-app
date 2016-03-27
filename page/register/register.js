ttoApp.controller('registerCtrl', ['$scope', '$rootScope', '$mdDialog', 'ApiServ', 
function ($scope, $rootScope, $mdDialog, ApiServ) {
  $rootScope.icon = "person_add";
  $rootScope.title = "Register"; 
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.register = true;
  $rootScope.isLoading = 0;

  $scope.allAvatar = ttoAvatarList();
  $scope.user = new ApiServ.User();
  $scope.user.avatarId = 'avatar-01';

  $scope.register = function () {
    $rootScope.isLoading++;
    $scope.user.$save(function (data) {
      $rootScope.isLoading--;
      var alert = $mdDialog.alert({
          title: 'Register Completed',
          content: 'Please check your email for serial code - ตรวจสอบอีเมล์เพื่อรับรหัส',
          ok: 'OK'
      });
      $mdDialog.show(alert).finally(function() {alert = undefined;});
      $rootScope.goRoute('/', 'clear');
    }, function (response) {
      $rootScope.isLoading = 0;
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }
}]);
