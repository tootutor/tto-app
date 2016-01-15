ttoApp.directive('mdKtx', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    link: function ($scope, $elem, $attrs, ngModel) {
      ngModel.$render = function () {
        var html1 = marked(ngModel.$viewValue || '');
        html2 = ASCIIMathKaTeXHTML(html1);
        $elem.html(html2);
      };
    }
  };
});

ttoApp.directive('ktx', function () {
  return {
    restrict: 'E',
    require: 'ngModel',
    link: function ($scope, $elem, $attrs, ngModel) {
      ngModel.$render = function () {
        var html1 = ngModel.$viewValue || '';
        html2 = ASCIIMathKaTeXHTML(html1);
        $elem.html(html2);
      };
    }
  };
});
