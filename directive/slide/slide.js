ttoApp.directive('slide', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    templateUrl: 'view/slide.html',
    controller: slideCtrl,
    link: slideLink
  };

	function slideCtrl($scope) {
		$scope.option  = {};
		$scope.sources = [];
		$scope.codes   = [];
		$scope.slide   = "";
		$scope.note    = "";
		$scope.index   = 0;
		$scope.isEnd   = false;

		$scope.initSlide    = initSlide;
		$scope.refreshSlide = refreshSlide;
		$scope.nextSlide    = nextSlide;
	
		function initSlide() {
			$scope.slide   = "";
			$scope.note    = "";
			$scope.index   = 0;
			$scope.isEnd   = false;
		}
		
		function refreshSlide() {
			$scope.initSlide();
			$scope.nextSlide();
		}
		
		function nextSlide() {
			var details = $scope.codes[$scope.index].split('*****'); // Split note and slide
			var slides = details[0].split('!!!!!');

			if (slides[1]) { // If slide action is avaialbe
				var slideOption = JSON.parse(slides[1]);
				if (slideOption.action == 'new') {
					$scope.slide = slides[0];
				} else {
					$scope.slide = $scope.slide + slides[0];
				}
			} else {
				$scope.slide = $scope.slide + slides[0];
			}
			
			if (details[1]) { // If note is available
				$scope.note = details[1];
			} else {
				$scope.note = ". . .";
			}
			
			$scope.index++;
			if ($scope.index >= $scope.codes.length) {
				$scope.isEnd = true;
			}
		}
		
	}
	
	function slideLink($scope, $elem, $attr, ngModel) {
		ngModel.$render = function () {
			var content = ngModel.$viewValue || '';
			try {
				$scope.sources = content.split('====='); // Split control and content code
				$scope.option = JSON.parse($scope.sources[0]);
				$scope.codes = $scope.sources[1].split('-----'); // Split slide and additional from content content
				dummyElem = $elem[0].getElementsByClassName('dummy');
		
				if ($scope.option.style) {
					dummyElem[0].style.width = $scope.option.style.width;
					dummyElem[0].style.height = $scope.option.style.height;
				}
		
				$scope.initSlide();
				$scope.nextSlide();
			} catch (err) {
				console.log(err);
			}
		}
	}

});