ttoApp.controller('profileCtrl', ['$scope', '$rootScope', '$mdDialog', 'UserServ',
function ($scope, $rootScope, $mdDialog, UserServ) {
  $rootScope.icon = "person";
  $rootScope.title = "Profile"; 
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.profileUpdate = true;

  $scope.allAvatar = ttoAvatarList();
  $rootScope.isLoading++;
  $scope.user = UserServ.get({userId: $rootScope.userId}, function(data) {
    $scope.user.birthdate = new Date(data.birthdate); //Set format for date field
    $rootScope.firstname = data.firstname;
    $rootScope.lastname  = data.lastname;
    $rootScope.nickname  = data.nickname;
    $rootScope.isLoading--;
  }, function (response) {
    $rootScope.errorDialog(response, 'Loading Error !!!');
  });

  $scope.profileUpdate = function () {
    $rootScope.isLoading++;
    $scope.user.$update({userId: $rootScope.userId}, function(data) {
      $rootScope.isLoading--;
      var alert = $mdDialog.alert({title: 'Update Completed', content: 'Updated your profile successfully.', ok: 'OK'});
      $mdDialog.show(alert).finally(function() {alert = undefined;});
      $rootScope.goRoute('/', 'clear');
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

}]);