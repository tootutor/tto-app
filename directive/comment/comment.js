ttoApp.directive('comment', function () {
  return {
    restrict: 'E',
    scope: {userId: '=', userCourseItemId: '=', content: '='},
    templateUrl: 'component/comment/comment.html',
    controller: commentCtrl,
    link: commentLink
  };

	commentCtrl.$inject = ['$scope', '$rootScope', 'Restangular'];
	
	function commentCtrl($scope, $rootScope, Restangular) {
		$scope.addNewComment = addNewComment;

		commentCtrlInit();
		
		function commentCtrlInit() {
			if (!$scope.userId) {
				$scope.userId = $rootScope.userId;
			}
			var userId = $scope.userId;
			var headerObj = {'token' : $rootScope.token};
			var userCourseItemId = $scope.userCourseItemId;

			$rootScope.isLoading++;
			Restangular.one('comment/allcomment', userCourseItemId).get({}, headerObj)
			.then(function (data) {
				$scope.allComment = data;
				$rootScope.isLoading--;
			}, function (response) {
				$rootScope.errorDialog(response, 'Loading Error !!!');
			});
		}
			
		function addNewComment() {
			var userCourseItemId = $scope.userCourseItemId;
			var headerObj = {'token' : $rootScope.token};
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
			Restangular.all('notification/newnotification').post(postObj, {}, headerObj)
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
			Restangular.all('comment/newcomment').post(postObj, {}, headerObj)
			.then(function (data) {
				$scope.allComment.push(newComment);
				$scope.newMessage = '';
			}, function (response) {
				$rootScope.errorDialog(response, 'Update Error !!!');
			});
		}
		
	}
	
	function commentLink($scope, $elem, $attr) {
	}

}
);