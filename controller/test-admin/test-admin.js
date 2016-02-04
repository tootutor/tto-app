ttoApp.controller('testAdminCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', 'Something', '$routeParams',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, Something, $routeParams) {
  $rootScope.icon = 'help';
  $rootScope.title = 'Test Admin';
  $rootScope.showTab = 0;
  $rootScope.showBack = false;
  $rootScope.component = {};

  console.log($routeParams);
    
  function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
  }

  $scope.youtubeId = 'imJw-EsHVoo';

  $scope.swal = swal;
  
  $scope.jsxjcContent = "";
  $scope.slideContent = "";
  $scope.content = "";

  $scope.settings = {
    closeEl: '.close',
    overlay: {
      templateUrl: 'view/view-ng-morph.html'
    },
    modal: {
      templateUrl: 'view/view-ng-morph.html',
      position: {
        top: '30%',
        left: '20%'
      },
      fade: false
    }
  };

  $scope.jsxjcInput = hereDoc(function() {/*!
{
  "style": {
    "width":"400px",
    "height":"400px"
  },
  "jsxgraph": {
    "axis":true,
    "keepaspectratio":true, 
    "showCopyright":false,
    "showNavigation":false
  }
}
===== 
  */});

  $scope.slideInput = hereDoc(function() {/*!
{
"style":{
"width":"100%",
"height":"150px"
}
}
=====
AAAA
-----
BBBB
-----
CCCC
-----
DDDD
  */});

  $scope.loadStorage = function() {
    $scope.content = localStorage.getItem('ttoContent6');
  }

  $scope.transform = function() {
    a = document.getElementById('aaa');
    b = document.getElementById('bbb');
    ramjet.transform( a, b );
  }

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      templateUrl: 'dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
  
}
]);