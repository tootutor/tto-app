ttoApp.directive('svgVivus', function () {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function ($scope, $elem, $attrs, ngModel) {
      ngModel.$render = function () {
        var svg = ngModel.$viewValue;
				$elem.html(svg);
				svgDOM = $elem[0].firstElementChild;
				if (svgDOM && svgDOM.nodeName == 'svg') {
					new Vivus(svgDOM, {type: 'oneByOne', duration: 100});
				}
      };
    }
  };
});