ttoApp.controller('addUserCourseItemAdminCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course';
  $rootScope.showTab = 0;
  $rootScope.selectedTab = 0;
  $rootScope.component = {};

  $scope.isNoNewData = false;
  $scope.newCourseItemList = {};

  $scope.addUserCourseItemAdmin = addUserCourseItemAdmin;

  addUserCourseItemAdminInit();
  
  function addUserCourseItemAdminInit() {
    var userId = $routeParams.userId;
    var token  = $rootScope.token;
    var headerObj = {'token' : token};
    var userCourseId = $routeParams.userCourseId;

    $rootScope.isLoading++;
    Restangular.one('usercourseitem/newitemlist/'+userId, userCourseId).get({}, headerObj)
    .then(function (data) {
      if (data.length > 0) {
        $scope.newCourseItemList = data;
      } else {
        $scope.isNoNewData = true;
      }
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  }
  
  function addUserCourseItemAdmin(newCourseItem) {
    $scope.loadTarget++;
    var userId = $routeParams.userId;
    var token  = $rootScope.token;
    var headerObj = {'token' : token};
    var userCourseId = $routeParams.userCourseId;
    var postObj = {
      userId       : userId, 
      userCourseId : userCourseId, 
      courseItemId : newCourseItem.courseItemId,
      actionCount  : newCourseItem.actionCount
    };

    $rootScope.isLoading++;
    Restangular.all('usercourseitem/newitem').post(postObj, {}, headerObj)
    .then(function (data) {
      $rootScope.goRoute('user-course-item-detail-admin/' + $routeParams.userId + '/' + data.userCourseItemId, 'skip');
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
  });
  }

}
]);