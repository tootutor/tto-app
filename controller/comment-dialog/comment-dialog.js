ttoApp.controller('commentDialogCtrl', ['$scope', 'Restangular', '$rootScope', '$mdDialog',
function($scope, Restangular, $rootScope, $mdDialog) {
	$scope.userId = $rootScope.component.comment.userId;
	$scope.userCourseItemId = $rootScope.component.comment.userCourseItemId;
	$scope.content = $rootScope.component.comment.content;
	
	$scope.hideDialog = hideDialog;
	$scope.addNewComment = addNewComment;

	commentDialogCtrlInit();
	
	function commentDialogCtrlInit() {
		$rootScope.isLoading++;
		Restangular.one('comment/allcomment', $scope.userCourseItemId).get({}, $rootScope.headerObj)
		.then(function (data) {
			$scope.allComment = data;
			$rootScope.isLoading--;
		}, function (response) {
			$rootScope.errorDialog(response, 'Loading Error !!!');
		});
	}
	
	function hideDialog() {
		$mdDialog.hide();
	}
	
	function addNewComment() {
		var postObj = {};

		if ($rootScope.role == 'admin') {
			postObj = {
				userId     : $scope.userId,
				routeUrl   : 'user-course-item-detail/' + $scope.userCourseItemId,
				fromUserId : $rootScope.userId,
				content    : $scope.content + "\n - _Too.Tutor : " + $scope.newMessage + "_"
			};
		} else {
			postObj = {
				userId     : 1,
				routeUrl   : 'user-course-item-detail-admin/' + $rootScope.userId + '/' + $scope.userCourseItemId,
				fromUserId : $rootScope.userId,
				content    : $scope.content + '\n - _' + $rootScope.nickname + ' : ' + $scope.newMessage + "_"
			};
		}
		Restangular.all('notification/newnotification').post(postObj, {}, $rootScope.headerObj)
		.then(function (data) {
			console.log('added notification');
		}, function (response) {
			$rootScope.errorDialog(response, 'Update Error !!!');
		});

		var newComment = {
			userCourseItemId : $scope.userCourseItemId, 
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
	
}
]);