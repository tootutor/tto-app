ttoApp.controller('categoryCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', 'CategoryServ', 
  function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, CategoryServ) {
    $rootScope.icon = 'class';
    $rootScope.title = 'Category';
    $rootScope.showTab = 0;
    $rootScope.showBack = true;
    $rootScope.component = {};

    categoryCtrlInit();
    
    function categoryCtrlInit() {
      var userId = $rootScope.userId;
      $rootScope.isLoading++;
      $scope.allCategory = CategoryServ.query(function () {
        $rootScope.isLoading--;
      });
    }

  }]
);