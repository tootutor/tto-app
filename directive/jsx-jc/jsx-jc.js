ttoApp.directive('jsxJc', ['$mdDialog', function ($mdDialog) {
  return {
    restrict: 'E',
    scope: {dump: '='},
    require: 'ngModel',
    templateUrl: 'view/jsxgraph.html',
    controller: jsxCtrl,
    link: jsxLink
  };

	function jsxCtrl($scope) {
		$scope.board   = {};
		$scope.id      = '';
		$scope.option  = {};
		$scope.sources = [];
		$scope.codes   = [];
		
		$scope.note    = "";
		$scope.slide   = "";
		$scope.index   = 0;
		$scope.isEnd   = false;
		$scope.enableSlide = false;		

		$scope.initJSX    = initJSX;
		$scope.refreshJSX = refreshJSX;
		$scope.nextJSX    = nextJSX;
		$scope.dumpJSX    = dumpJSX;

		function initJSX() {
			$scope.board = initBoard($scope.id, $scope.option.jsxgraph);

			$scope.board.jc = new JXG.JessieCode();
			$scope.board.jc.use($scope.board);
			
			$scope.note  = "";
			$scope.slide   = "";
			$scope.index = 0;
			$scope.isEnd = false;
			$scope.enableSlide = false;		
	
		}
		
		function refreshJSX() {
			JXG.JSXGraph.freeBoard($scope.board);
			$scope.initJSX();
			$scope.nextJSX(); //parse the 1st code.
		}
		
		function nextJSX() {
			var tempText = "";
			var tempArray = [];
			var jc = "";

			tempText = $scope.codes[$scope.index];

			// Extract note section
			tempArray = tempText.split('*****');
			if (tempArray[1]) {
				$scope.note = tempArray[1];
			} else {
				$scope.note = '. . .';
			}
			tempText = tempArray[0];

			// Extract JC section
			tempArray = tempText.split('#####');
			$scope.board.jc.parse(tempArray[0]);

			if (tempArray[1]) {
				$scope.enableSlide = true;
				tempText = tempArray[1];
				tempArray = tempText.split('!!!!!');
				if (tempArray[1]) {
					var slideOption = JSON.parse(tempArray[1]);
					if (slideOption.action == 'new') {
						$scope.slide = tempArray[0];
					} else {
						$scope.slide = $scope.slide + tempArray[0];
					}
				} else {
					$scope.slide = $scope.slide + tempArray[0];
				}
			} else {
				$scope.enableSlide = false;
			}
			
			$scope.index++;
			if ($scope.index >= $scope.codes.length) {
				$scope.isEnd = true;
			}
		}

		function dumpJSX() {
			var initDump = "";
			initDump = JSON.stringify($scope.option);
			initDump = initDump + '\n=====\n';
			$scope.dumpCode = initDump + toJessie($scope.board);
			localStorage.setItem('ttoJSXEdit', $scope.dumpCode);
			var alert = $mdDialog.alert({title: 'Saved to ttoJSXEdit', content: '', ok: 'OK'});
			$mdDialog.show( alert ).finally(function() {alert = undefined;});
		}
		
	}
	
	function jsxLink($scope, $elem, $attr, ngModel) {
		ngModel.$render = function () {
			var content = ngModel.$viewValue || '';
			$scope.sources = content.split('=====');
			try {
				$scope.option = JSON.parse($scope.sources[0]);
				$scope.codes = $scope.sources[1].split('-----');
				$scope.id = 'jsx-' + Date.now(); //random a DIV's id for JSX
				dummyElem = $elem[0].getElementsByClassName('dummy');
				dummyElem[0].setAttribute("id", $scope.id); //Assign ID to dummy-id in template 
		
				slideElem = $elem[0].getElementsByClassName('jsxslide');
		
				dummyElem[0].style.width = $scope.option.style.width;
				dummyElem[0].style.height = $scope.option.style.height;
				slideElem[0].style.height = $scope.option.style.height;
		
				$scope.initJSX();
				$scope.nextJSX();
			} catch (err) {
				console.log(err);
			}
		};
	}

}
]);