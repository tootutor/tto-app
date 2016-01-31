ttoApp.controller('userCourseItemAdminCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, $filter) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course Admin';
  //$rootScope.showTab = 1;
  $rootScope.showBack = true;
  //$rootScope.selectedTab = 0;
  $rootScope.component = {};
  $rootScope.component.addUserCourseItemAdmin = true;

  $scope.learnCourseItemList = {};
  $scope.startCourseItemList = {};
  $scope.doneCourseItemList = {};

  // Event from rootScope view
  $scope.$on('addUserCourseItemAdmin', function(event) {
    $rootScope.goRoute('add-user-course-item-admin/' + $routeParams.userId + '/' + $routeParams.userCourseId, 'keep');
  });


  userCourseItemAdminInit();
  
  function userCourseItemAdminInit() {
    if ($rootScope.userCourseItemList.userCourseId != $routeParams.userCourseId) {
      var userId = $routeParams.userId;
      var userCourseId = $routeParams.userCourseId;
      $rootScope.isLoading++;
      Restangular.one('usercourseitem/itemlist/'+userId, userCourseId).get({}, $rootScope.headerObj)
      .then(function (data) {
        if (data.length > 0) {
          $rootScope.userCourseItemList.userCourseId = $routeParams.userCourseId;
          $rootScope.userCourseItemList.data = data;
          /*
          $scope.learnCourseItemList = $filter('filter')(data, { itemGroupId: 2 });
          $scope.learnCourseItemList = $filter('orderBy')($scope.learnCourseItemList, ['-status','userCourseItemId']);
          $rootScope.countLearn = $filter('filter')(data, { itemGroupId: 2, status: 'start' }).length;

          $scope.startCourseItemList = $filter('filter')(data, { itemGroupId: 1, status: 'start' });
          $scope.startCourseItemList = $filter('orderBy')($scope.startCourseItemList, 'userCourseItemId');
          $rootScope.countStart = $scope.startCourseItemList.length;

          $scope.doneCourseItemList = $filter('filter')(data, { itemGroupId: 1, status: 'done' });
          $scope.doneCourseItemList = $filter('orderBy')($scope.doneCourseItemList, 'userCourseItemId');
          $rootScope.countDone = $scope.doneCourseItemList.length;
          */
        }
        $rootScope.isLoading--;
      }, function (response) {
        $rootScope.isLoading--;
        $rootScope.errorDialog(response, 'Loading Error !!!');
      });
    }
  }
  
}
]);