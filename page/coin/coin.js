ttoApp.controller('coinCtrl', ['$scope', '$rootScope', '$mdDialog', '$mdSidenav', 'CoinServ', 'OrderServ', 'UserOrderServ', 'BankServ', 'UserCoinServ',
function ($scope, $rootScope, $mdDialog, $mdSidenav, CoinServ, OrderServ, UserOrderServ, BankServ, UserCoinServ) {
  $rootScope.icon = "stars";
  $rootScope.title = "Coins"; 
  $rootScope.showTab = 0;
   $rootScope.url = 'coin';
   $rootScope.showBack = true;
   $rootScope.backUrl  = '/';
   $rootScope.component = {};
  
  $rootScope.isLoading = 0;

  $scope.myCoin = 0;
  $scope.newOrder = new OrderServ();
  $scope.newOrder.userId = $rootScope.userId;
  $scope.confirmOrder = {};
  $scope.confirmOrder.bankId = 1;
  $scope.orderList = [];
  
  $scope.coinNewOrder = coinNewOrder;
  $scope.coinSelect = coinSelect;
  $scope.coinConfirmOrder = coinConfirmOrder;

   coinCtrlInit();
   
   function coinCtrlInit() {
    $rootScope.isLoading++;
    $scope.allBank = BankServ.query(function () {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

    $rootScope.isLoading++;
    $scope.myCoin = UserCoinServ.get({userId: $rootScope.userId}, function () {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

    $rootScope.isLoading++;
    $scope.orderList = UserOrderServ.query({userId: $rootScope.userId}, function () {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

    $rootScope.isLoading++;
    $scope.allPackage = CoinServ.query(function () {
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
    
   }

  function coinNewOrder() {
    $rootScope.isLoading++;
    $scope.newOrder.$save(function (data) {
      var alert = $mdDialog.alert({title: 'Update Completed !!!', content: '', ok: 'OK'});
      $mdDialog.show( alert ).finally(function() {alert = undefined;});
      $scope.orderList.push($scope.newOrder);
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function coinSelect() {
    $scope.newOrder.coin = $scope.allPackage[$scope.selectedPackage].coin;
    $scope.newOrder.bonus = $scope.allPackage[$scope.selectedPackage].bonus;
    $scope.newOrder.amount = $scope.allPackage[$scope.selectedPackage].amount;
  }

  function coinConfirmOrder(order) {
    $rootScope.isLoading++;
    order.transferDate = order.updateTransferDate; // To solve date format error
    order.transferAmount = order.updateTransferAmount; // To solve date format error
    order.$update({orderId: order.orderId, userId: $rootScope.userId}, function(data) {
      var alert = $mdDialog.alert({title: 'Update Completed !!!', content: '', ok: 'OK'});
      $mdDialog.show( alert ).finally(function() {alert = undefined;});
      order.status = 'confirm';
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });

  }
  
}]);