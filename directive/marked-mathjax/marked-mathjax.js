ttoApp.directive('mdMjx', function () {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function ($scope, $elem, $attrs, ngModel) {
      if (!ngModel) {
        var html = marked($elem.text());
        $elem.html(html);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $elem[0]]);
        return;
      }
      ngModel.$render = function () {
        var html = marked(ngModel.$viewValue || '');
        $elem.html(html);
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $elem[0]]);
      };
    }
  };
});

ttoApp.directive('md', function () {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function ($scope, $elem, $attrs, ngModel) {
      if (!ngModel) {
        var html = marked($elem.text());
        $elem.html(html);
        return;
      }
      ngModel.$render = function () {
        var html = marked(ngModel.$viewValue || '');
        $elem.html(html);
      };
    }
  };
});

ttoApp.directive('mjx', function () {
  return {
    restrict: 'E',
    require: '?ngModel',
    link: function ($scope, $elem, $attrs, ngModel) {
      if (!ngModel) {
        $elem.html($elem.text());
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $elem[0]]);
        return;
      }
      ngModel.$render = function () {
        $elem.html(ngModel.$viewValue || '');
        MathJax.Hub.Queue(["Typeset", MathJax.Hub, $elem[0]]);
      };
    }
  };
});
