ttoApp.controller('userCourseItemDetailAdminCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog', '$mdSidenav', '$routeParams', '$filter',
function ($scope, Restangular, $rootScope, $mdDialog, $mdSidenav, $routeParams, $filter) {
  $rootScope.icon = 'class';
  $rootScope.title = 'Course Admin';
  $rootScope.showTab = 0;
  $rootScope.showBack = true;
  $rootScope.component = {};
  $rootScope.component.addItemDetail = true;
  $rootScope.component.backButton = true;
  $rootScope.isLoading = 0;

  $scope.userId = $routeParams.userId;
  $scope.userCourseItemId = $routeParams.userCourseItemId;
  $scope.isNoData = false;
  $scope.item = {};
  $scope.allComment = {};
  $scope.message = '';

  $scope.addNewComment          = addNewComment;
  $scope.processItemRadioPoint  = processItemRadioPoint;
  $scope.processItemRadio       = processItemRadio;
  $scope.processItemSelect      = processItemSelect;
  $scope.processItemSelectPoint = processItemSelectPoint;
  $scope.processItemInput       = processItemInput;
  $scope.enableEdit             = enableEdit;
  $scope.disableEdit            = disableEdit;
  $scope.updateItem             = updateItem;
  $scope.addItemDetail          = addItemDetail;
  $scope.updateItemDetail       = updateItemDetail;
  $scope.updateItemRadio        = updateItemRadio;
  $scope.updateItemInput        = updateItemInput;
  $scope.updateItemSelect       = updateItemSelect;
  $scope.saveToLocalStorage     = saveToLocalStorage;
  $scope.loadFromLocalStorage   = loadFromLocalStorage;
  $scope.loadDataURI            = loadDataURI;

  // Event from rootScope view
  $scope.$on('addItemDetail', function(event) {
    $scope.addItemDetail();
  });
  
  userCourseItemDetailAdminInit();
  
  function userCourseItemDetailAdminInit() {
    var userId = $routeParams.userId;
    var userCourseItemId = $routeParams.userCourseItemId;

    $rootScope.isLoading++;
    Restangular.one('usercourseitem/itemdetail/'+userId, userCourseItemId).get({}, $rootScope.headerObj)
    .then(function (data) {
      $scope.item = data;
      $rootScope.component.comment = {userId: userId, userCourseItemId: userCourseItemId, content: $scope.item.content};
      for (var i = 0; i < $scope.item.allItemDetail.length; i++) {
        if ($scope.item.allItemDetail[i].itemTypeId == 3) {
          for (var j = 0; j < $scope.item.allItemDetail[i].allItemSelect.length; j++) {
            if ($scope.item.allItemDetail[i].allItemSelect[j].userIsAnswer == 1) {
              $scope.item.allItemDetail[i].allItemSelect[j].userIsAnswer = true;
            } else {
              $scope.item.allItemDetail[i].allItemSelect[j].userIsAnswer = false;
            }
          }
        }
      }
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

    $rootScope.isLoading++;
    Restangular.one('comment/allcomment', userCourseItemId).get({}, $rootScope.headerObj)
    .then(function (data) {
      $scope.allComment = data;
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

    $rootScope.isLoading++;
    Restangular.all('item/allitemtype').getList({}, $rootScope.headerObj)
    .then(function (data) {
      if (data.length > 0) {
        $scope.allItemType = data;
      } else {
        $scope.isNoData = true;
      }
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });

    $rootScope.isLoading++;
    Restangular.all('item/allitemgroup').getList({}, $rootScope.headerObj)
    .then(function (data) {
      if (data.length > 0) {
        $scope.allItemGroup = data;
      } else {
        $scope.isNoData = true;
      }
      $rootScope.isLoading--;
    }, function (response) {
      $rootScope.errorDialog(response, 'Loading Error !!!');
    });
  }

  function findIndexByKey(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
      if (arraytosearch[i][key] == valuetosearch) {
        return i;
      }
    }
    return null;
  }

  function addNewComment() {
    var userCourseItemId = $routeParams.userCourseItemId;
    var postObj = {};

    if ($rootScope.role == 'admin') {
      postObj = {
        userId     : $scope.item.userId,
        routeUrl   : 'user-course-item-detail/' + $routeParams.userCourseItemId,
        fromUserId : $rootScope.userId,
        content    : $scope.item.content + "\n - _Too.Tutor : " + $scope.newMessage + "_"
      };
    } else {
      postObj = {
        userId     : 1,
        routeUrl   : 'user-course-item-detail-admin/' + $rootScope.userId + '/' + $routeParams.userCourseItemId,
        fromUserId : $rootScope.userId,
        content    : $scope.item.content + '\n - _' + $rootScope.nickname + ' : ' + $scope.newMessage + "_"
      };
    }
    Restangular.all('notification/newnotification').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      console.log('added notification');
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });

    var newComment = {
      userCourseItemId : $routeParams.userCourseItemId, 
      userId           : $rootScope.userId, 
      timestamp        : '',
      message          : $scope.newMessage,
      nickname         : ''
    };
    postObj = newComment;
    Restangular.all('comment/newcomment').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      $scope.allComment.push(newComment);
      $scope.newMessage = '';
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function processItemRadioPoint(itemDetail) {
    var index = findIndexByKey(itemDetail.allItemRadio, 'itemRadioId', itemDetail.userItemRadioId);   
    itemDetail.point = itemDetail.allItemRadio[index].point;
  }
  
  function processItemRadio(itemDetail) {
    $scope.item.actionCount--;
    var postObj = {
      userId           : $rootScope.userId,
      userCourseItemId : $routeParams.userCourseItemId, 
      itemDetailId     : itemDetail.itemDetailId, 
      itemRadioId      : itemDetail.userItemRadioId,
      point            : itemDetail.point,
      actionCount      : $scope.item.actionCount
    };
    Restangular.all('usercourseitem/newitemradio').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      itemDetail.status = 'done';
      if ($scope.item.actionCount <= 0) {
        $scope.item.status = 'done';
      }
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function processItemSelectPoint(itemDetail, itemSelect) {
    if (itemSelect.userIsAnswer) {
      itemDetail.point = Number(itemDetail.point) + Number(itemSelect.point);
    } else {
      itemDetail.point = Number(itemDetail.point) + Number(itemSelect.point);
    }
  }

  function processItemSelect(itemDetail) {
    $scope.item.actionCount--;
    var allItemSelect = $filter('filter')(itemDetail.allItemSelect, { userIsAnswer: true });
    var postObj = {
      userId           : $rootScope.userId,
      userCourseItemId : $routeParams.userCourseItemId, 
      itemDetailId     : itemDetail.itemDetailId, 
      point            : itemDetail.point,
      actionCount      : $scope.item.actionCount,
      allItemSelect    : allItemSelect
    };
    Restangular.all('usercourseitem/newitemselect').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      itemDetail.status = 'done';     
      if ($scope.item.actionCount <= 0) {
        $scope.item.status = 'done';
      }
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function processItemInput(itemDetail) {
    //Loop input list to check answer
    for (var i = 0; i < itemDetail.allItemInput.length; i++) {
      if (itemDetail.allItemInput[i].answer == itemDetail.allItemInput[i].userAnswer) {
        itemDetail.point = Number(itemDetail.point) + Number(itemDetail.allItemInput[i].point);
      }
    }
    $scope.item.actionCount--;
    var postObj = {
      userId           : $rootScope.userId,
      userCourseItemId : $routeParams.userCourseItemId, 
      itemDetailId     : itemDetail.itemDetailId, 
      point            : itemDetail.point,
      actionCount      : $scope.item.actionCount,
      allItemInput     : itemDetail.allItemInput
    };
    Restangular.all('usercourseitem/newiteminput').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      itemDetail.status = 'done';     
      if ($scope.item.actionCount <= 0) {
        $scope.item.status = 'done';
      }
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function enableEdit(object) {
    object.editMode = true;
  }

  function disableEdit(object) {
    object.editMode = false;
  }

  function updateItem(item) {
    var postObj = {
      itemId     : item.itemId, 
      code       : item.code,
      content    : item.content,
      itemGroupId: item.itemGroupId
    };
    Restangular.all('item/updateitem').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      item.editMode = false;
      var alert = $mdDialog.alert({title: 'Update Item Completed !!!', content: '', ok: 'OK'});
      $mdDialog.show( alert ).finally(function() {alert = undefined;});
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function addItemDetail() {
    var newItemDetail = {
      editMode   : true,
      itemId     : $scope.item.itemId,
      seq        : 0, 
      itemTypeId : 2,
      code       : $scope.item.code,
      content    : '',
      isAction   : 0,
      showOption : 0
    };
    $scope.item.allItemDetail.push(newItemDetail);
  }

  function updateItemDetail(itemDetail) {
    var postObj = {};
    if (itemDetail.itemDetailId) {
      postObj = {
        itemDetailId : itemDetail.itemDetailId, 
        itemId       : itemDetail.itemId, 
        seq          : itemDetail.seq,
        itemTypeId   : itemDetail.itemTypeId,
        code         : itemDetail.code,
        content      : itemDetail.content,
        isAction     : itemDetail.isAction,
        showOption   : itemDetail.showOption
      };
      Restangular.all('item/updateitemdetail').post(postObj, {}, $rootScope.headerObj)
      .then(function (data) {
        itemDetail.editMode = false;
        var alert = $mdDialog.alert({title: 'Update Item Detail Completed !!!', content: '', ok: 'OK'});
        $mdDialog.show( alert ).finally(function() {alert = undefined;});
      }, function (response) {
        $rootScope.errorDialog(response, 'Update Error !!!');
      });
    } else {
      postObj = {
        itemId       : itemDetail.itemId, 
        seq          : itemDetail.seq,
        itemTypeId   : itemDetail.itemTypeId,
        code         : itemDetail.code,
        content      : itemDetail.content,
        isAction     : itemDetail.isAction,
        showOption   : itemDetail.showOption
      };
      Restangular.all('item/newitemdetail').post(postObj, {}, $rootScope.headerObj)
      .then(function (data) {
        itemDetail.itemDetailId = data.itemDetailId;
        itemDetail.editMode = false;
        var alert = $mdDialog.alert({title: 'Added Item Detail !!!', content: '', ok: 'OK'});
        $mdDialog.show( alert ).finally(function() {alert = undefined;});
      }, function (response) {
        $rootScope.errorDialog(response, 'Add Error !!!');
      });
    }
  }

  function updateItemRadio(itemRadio) {
    var postObj = {};
    postObj = {
      itemRadioId : itemRadio.itemRadioId, 
      content     : itemRadio.content,
      isAnswer    : itemRadio.isAnswer,
      point       : itemRadio.point
    };
    Restangular.all('item/updateitemradio').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      var alert = $mdDialog.alert({title: 'Update Item Radio Completed !!!', content: '', ok: 'OK'});
      $mdDialog.show( alert ).finally(function() {alert = undefined;});
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function updateItemSelect(itemSelect) {
    var postObj = {};
    postObj = {
      itemSelectId : itemSelect.itemSelectId, 
      content      : itemSelect.content,
      isAnswer     : itemSelect.isAnswer,
      point        : itemSelect.point
    };
    Restangular.all('item/updateitemselect').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      var alert = $mdDialog.alert({title: 'Update Item Select Completed !!!', content: '', ok: 'OK'});
      $mdDialog.show( alert ).finally(function() {alert = undefined;});
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function updateItemInput(itemInput) {
    var postObj = {};
    postObj = {
      itemInputId : itemInput.itemInputId, 
      question    : itemInput.question,
      answer      : itemInput.answer,
      answerType  : itemInput.answerType,
      point       : itemInput.point
    };
    Restangular.all('item/updateiteminput').post(postObj, {}, $rootScope.headerObj)
    .then(function (data) {
      var alert = $mdDialog.alert({title: 'Update Item Input Completed !!!', content: '', ok: 'OK'});
      $mdDialog.show( alert ).finally(function() {alert = undefined;});
    }, function (response) {
      $rootScope.errorDialog(response, 'Update Error !!!');
    });
  }

  function saveToLocalStorage(itemDetail) {
    var storageName = 'ttoContent' + itemDetail.itemTypeId;
    localStorage.setItem(storageName, itemDetail.content);
    var alert = $mdDialog.alert({title: 'Saved to ' + storageName, content: '', ok: 'OK'});
    $mdDialog.show( alert ).finally(function() {alert = undefined;});
  }

  function loadFromLocalStorage(itemDetail) {
    var storageName = 'ttoContent' + itemDetail.itemTypeId;
    itemDetail.content = localStorage.getItem(storageName);
    var alert = $mdDialog.alert({title: 'Loaded from ' + storageName, content: '', ok: 'OK'});
    $mdDialog.show( alert ).finally(function() {alert = undefined;});
  }

  function loadDataURI(itemDetail) {
    var storageName = 'ttoCopyPaste';
    itemDetail.content = localStorage.getItem(storageName);
    var alert = $mdDialog.alert({title: 'Loaded from ttoCopyPaste', content: '', ok: 'OK'});
    $mdDialog.show( alert ).finally(function() {alert = undefined;});
  }

}
]);