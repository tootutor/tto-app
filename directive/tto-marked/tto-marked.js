ttoApp.directive('ttoMark', function () {
  return {
    restrict: 'E',
    scope: {process: '='},
    require: 'ngModel',
    link: ttoMarkLink
    };
  
  function ttoMarkLink($scope, $elem, $attrs, ngModel) {
    ngModel.$render = function () {
			if (!$scope.process) {
				$scope.process = ["tto","ams","md"];
			}
			
			//var process = JSON.parse($scope.process);
			var process = $scope.process;
			var html = ngModel.$viewValue || '';
			
			for (var i=0; i<process.length; i++) {
				switch (process[i]) {
					//Markdown
					case "md" :
						html = marked(html);
						break;
					//Customize tag
					case "tto" :
						html = ttoRegExp(html);      				
						break;
						//ASCII Math
					case "ams" :
						html = ASCIIMathKaTeXHTML(html);
						break;
				}
			}
			$elem.html(html);
    };
  }
});