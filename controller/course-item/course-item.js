function courseItemCtrl ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $filter) {
  $rootScope.icon = 'link';
  $rootScope.title = 'Course Item';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;

  $scope.isLoading = 0;
  $scope.isNoData = false;
  $scope.allCourse = [];
  $scope.allItem = [];

  $scope.courseItem = {courseId : 0, itemList : []};

  $scope.addCourseItem = addCourseItem;

  courseItemInit();
  
  function courseItemInit() {
    //$scope.$on('addCourseITem', addCourseItem);
    var userId = $rootScope.userId;
    var token  = $rootScope.token;
    var headerObj = {'token' : token};

    $scope.isLoading++;
    Restangular.all('course/allcategory').getList({}, headerObj)
    .then(function (data) {
      $scope.allCategory = data;
      $scope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
    
    $scope.isLoading++;
    Restangular.all('course/allcourse').getList({}, headerObj)
    .then(function (data) {
      if (data.length > 0) {
        $scope.allCourse = data;
      } else {
        $scope.isNoData = true;
      }
      $scope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

    $scope.isLoading++;
    Restangular.all('item/allnewitem').getList({}, headerObj)
    .then(function (data) {
      if (data.length > 0) {
        $scope.allItem = data;
      } else {
        $scope.isNoData = true;
      }
      $scope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

  }
  
  function addCourseItem() {
    var userId = $rootScope.userId;
    var token  = $rootScope.token;
    var headerObj = {'token' : token};
    $scope.courseItem.itemList = $filter('filter')($scope.allItem, { checked: true });
    var postObj = $scope.courseItem;

    $scope.isLoading++;
    Restangular.all('courseitem/newcourseitem').post(postObj, {}, headerObj)
    .then(function (data) {
      $scope.isLoading--;
      var alert = $mdDialog.alert({title: 'Add Course Item Completed !!!', content: '', ok: 'OK'});
      $mdDialog.show( alert ).finally(function() {alert = undefined;});
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

}
